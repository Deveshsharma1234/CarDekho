const pool = require('../config/db').pool;
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

// Directory for reports
const REPORTS_DIR = path.join(__dirname, '../reports');
if (!fs.existsSync(REPORTS_DIR)) fs.mkdirSync(REPORTS_DIR);

// Main function to generate reports
function generateReport(reportType, generatedBy, callback) {
  pool.getConnection((err, connection) => {
    if (err) return callback(err);

    const reportDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let query;

    switch (reportType) {
      case 'Sales':
        query = `
          SELECT t.TransactionId, t.FinalPrice, t.TransactionDate, u1.FirstName AS Buyer, u2.FirstName AS Seller, c.ModelId
          FROM transactions t
          JOIN users u1 ON t.BuyerId = u1.UserId
          JOIN users u2 ON t.SellerId = u2.UserId
          JOIN carlistings c ON t.ListingId = c.ListingId
          WHERE t.Status = 'Completed'
          ORDER BY t.TransactionDate DESC
        `;
        break;
      case 'Revenue':
        query = `
          SELECT SUM(FinalPrice) AS TotalRevenue, COUNT(*) AS TransactionCount
          FROM transactions
          WHERE Status = 'Completed'
        `;
        break;
      case 'Fraud':
        query = `
          SELECT f.AlertId, f.Reason, f.Status, f.CreatedDate, u.FirstName AS ReportedBy, c.ModelId
          FROM fraudalerts f
          LEFT JOIN users u ON f.UserId = u.UserId
          LEFT JOIN carlistings c ON f.ListingId = c.ListingId
          ORDER BY f.CreatedDate DESC
        `;
        break;
      case 'UserActivity':
        query = `
          SELECT 
            (SELECT COUNT(*) FROM users WHERE CreatedDate > DATE_SUB(NOW(), INTERVAL 30 DAY)) AS NewUsersLast30Days,
            (SELECT COUNT(*) FROM users WHERE ActiveState = 1) AS ActiveUsers,
            (SELECT COUNT(*) FROM carreviews) AS TotalReviews
        `;
        break;
      case 'CarListings':
        query = `
          SELECT l.ListingId, l.Price, l.CreatedDate, m.ModelId, u.FirstName AS Seller
          FROM carlistings l
          JOIN users u ON l.UserId = u.UserId
          JOIN carmodels m ON l.ModelId = m.ModelId
          WHERE l.ActiveStatus = 1
          ORDER BY l.CreatedDate DESC
        `;
        break;
      default:
        connection.release();
        return callback(new Error('Invalid report type'));
    }

    // Execute query
    connection.query(query, (err, data) => {
      if (err) {
        connection.release();
        return callback(err);
      }

      // Generate PDF
      const fileName = `${reportType}_${reportDate.replace(/:/g, '-')}.pdf`;
      const filePath = path.join(REPORTS_DIR, fileName);
      const doc = new PDFDocument();
      const writeStream = fs.createWriteStream(filePath);

      doc.pipe(writeStream);
      doc.fontSize(20).text(`${reportType} Report - ${reportDate}`);
      doc.moveDown();

      // Add data to PDF
      if (Array.isArray(data)) {
        data.forEach((row, index) => {
          doc.fontSize(12).text(`Row ${index + 1}: ${JSON.stringify(row)}`);
          doc.moveDown();
        });
      } else {
        doc.fontSize(12).text(JSON.stringify(data));
      }

      doc.end();

      // Wait for file to finish writing
      writeStream.on('finish', () => {
        // Insert into reports table
        const insertQuery = `
          INSERT INTO reports (ReportType, GeneratedBy, ReportDate, FilePath)
          VALUES (?, ?, ?, ?)
        `;
        connection.query(insertQuery, [reportType, generatedBy, reportDate, filePath], (err, result) => {
          connection.release();
          if (err) return callback(err);
          callback(null, { success: true, filePath });
        });
      });

      writeStream.on('error', (err) => {
        connection.release();
        callback(err);
      });
    });
  });
}

module.exports = { generateReport };