const express = require('express');
const db = require('../config/db');
const authAndAuthorize = require('../middlewares/authAndAuthorize');
const Roles = require('../utils/Roles/roles');
const {
  getAllFraudAlertsQuery,
  resolveFraudAlertQuery,
}  = require( "../utils/query/fraudQueries.js");

const fraudRouter = express.Router();

/*
 * Fraud Alerts APIs
 */

// 1️ Get all fraud alerts (Admin, Verifier)
fraudRouter.get("/", authAndAuthorize(Roles.Admin, Roles.Verifier), (req, res) => {
  try {
    db.pool.query(getAllFraudAlertsQuery, [], (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ fraudAlerts: rows });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2️ Resolve fraud alert (Admin, Verifier)
fraudRouter.patch(
  "/:id/resolve",
  authAndAuthorize(Roles.Admin, Roles.Verifier),
  (req, res) => {
    try {
      const { id } = req.params;
      const ResolvedBy = req.user.UserId;
      const ResolvedAt = new Date();

      const values = [ResolvedBy, ResolvedAt, id];

      db.pool.execute(resolveFraudAlertQuery, values, (err, result) => {
        if (err) return res.status(400).json({ error: err.message });

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Fraud alert not found" });
        }

        res.json({ message: "Fraud alert resolved successfully" });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = fraudRouter;

