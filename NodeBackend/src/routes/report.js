const express = require("express");
const  db = require("../config/db.js");
const  authAndAuthorize  = require("../middlewares/authAndAuthorize.js");
const Roles = require("../utils/Roles/roles.js");
const { generateReport } = require("../Helper/reportGenerator.js");

const reportRouter = express.Router();


// 1️ Create report (Admin only)
reportRouter.post('/generate-report', authAndAuthorize(Roles.Admin), (req, res) => {
  const { reportType } = req.body; // e.g., { "reportType": "Sales" }
  const generatedBy = req.user.UserId;

  if (!['Sales', 'Revenue', 'Fraud', 'UserActivity', 'CarListings'].includes(reportType)) {
    return res.status(400).json({ success: false, error: 'Invalid report type' });
  }

  generateReport(reportType, generatedBy, (err, result) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.status(201).json({
      success: true,
      filePath: result.filePath,
      message: `Report ${reportType} generated successfully`
    });
  });
});


// 2️ Get all reports (Admin only) GET endpoint to list reports
reportRouter.get('/reports', authAndAuthorize(Roles.Admin), (req, res) => {
  const query = 'SELECT * FROM reports ORDER BY ReportDate DESC';
  db.pool.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, reports: results });
  });
});

module.exports = reportRouter;


