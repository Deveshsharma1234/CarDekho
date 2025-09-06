const cron = require('node-cron');
const { generateReport } = require('../Helper/reportGenerator');
const { connectDB } = require('../config/db');

// Function to initialize cron jobs
function initializeCronJobs() {
  // Ensure DB is connected before scheduling
  connectDB();

  // Schedule daily reports at midnight (for admin 1 replace as needed)
  cron.schedule('0 0 * * *', () => {
    console.log('Generating daily reports...');
    const reportTypes = ['Sales', 'Revenue', 'Fraud', 'UserActivity', 'CarListings'];

    reportTypes.forEach((reportType) => {
      generateReport(reportType, 1, (err, result) => {
        if (err) {
          console.error(`Error generating ${reportType} report:`, err.message);
        } else {
          console.log(`${reportType} report generated: ${result.filePath}`);
        }
      });
    });
  });
}

module.exports = { initializeCronJobs };