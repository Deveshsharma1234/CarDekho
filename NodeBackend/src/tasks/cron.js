const cron = require('node-cron');
const { generateReport } = require('../Helper/reportGenerator');
const { connectDB } = require('../config/db');
const Roles = require('../utils/Roles/roles');

// Function to initialize cron jobs
function initializeCronJobs() {
  // Ensure DB is connected before scheduling
  connectDB();

  // Schedule daily reports at midnight
  cron.schedule('0 0 * * *', () => {
    console.log('Generating daily reports...');
    const reportTypes = ['Sales', 'Revenue', 'Fraud', 'UserActivity', 'CarListings'];

    reportTypes.forEach((reportType) => {
      generateReport(reportType, Roles.Admin, (err, result) => {
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