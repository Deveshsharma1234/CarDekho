const express = require("express");

const  db = require("../config/db.js");
const  authAndAuthorize  = require("../middlewares/authAndAuthorize.js");
const  {
  createReportQuery,
  getAllReportsQuery,
} = require( "../utils/query/reportQueries.js");
const Roles = require("../utils/Roles/roles.js");

const reportRouter = express.Router();

/**
 * ====================
 * Reports APIs
 * ====================
 */

// 1️ Create report (Admin only)
reportRouter.post("/", authAndAuthorize(Roles.Admin), (req, res) => {
  try {
    const user = req.user;
    const { Title, Description } = req.body;
    const CreatedAt = new Date();

    if (!Title || !Description) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const values = [Title, Description, user.UserId, CreatedAt];

    db.pool.execute(createReportQuery, values, (err, result) => {
      if (err) return res.status(400).json({ error: err.message });

      res.status(201).json({
        message: "Report created successfully",
        ReportId: result.insertId,
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2️ Get all reports (Admin only)
reportRouter.get("/", authAndAuthorize(Roles.Admin), (req, res) => {
  try {
    db.pool.query(getAllReportsQuery, [], (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ reports: rows });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = reportRouter;


