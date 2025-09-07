const express = require("express");
const db = require("../config/db");
const authAndAuthorize = require("../middlewares/authAndAuthorize");
const {
  createTransactionQuery,
  getOwnTransactionsQuery,
  getAllTransactionsQuery,
  getTransactionsByUserQuery,
} = require("../utils/query/transactionQuery");
const Roles = require("../utils/Roles/roles");

const transactionRouter = express.Router();

// Purchase car (Citizen, Dealer)
transactionRouter.post("/buyCar",authAndAuthorize(Roles.Citizen, Roles.Dealer),
  (req, res) => {
    try {
      const user = req.user;
      const { ListingId, Amount, PaymentMethod } = req.body;
      const TransactionDate = new Date();

      if (!ListingId || !Amount || !PaymentMethod) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const values = [
        user.UserId,
        ListingId,
        Amount,
        PaymentMethod,
        TransactionDate,
        "SYSTEM",
      ];

      db.pool.execute(createTransactionQuery, values, (err, result) => {
        if (err) return res.status(400).json({ error: err.message });

        res.status(201).json({
          message: "Car purchased successfully",
          TransactionId: result.insertId,
        });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Get own transactions

transactionRouter.get("/myTransactions", authAndAuthorize(1, 2, 3, 4, 5), (req, res) => {
  try {
    const user = req.user;

    db.pool.query(
      getOwnTransactionsQuery,
      [user.UserId],
      (err, transactions) => {
        if (err) return res.status(400).json({ error: err.message });
        if (transactions.length === 0)
          return res.status(404).json({ message: "No transactions found" });

        res.json({ transactions });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all transactions (Admin only)

transactionRouter.get("/getAllTransactions", authAndAuthorize(Roles.Admin), (req, res) => {
  try {
    db.pool.query(getAllTransactionsQuery, (err, transactions) => {
      if (err) return res.status(400).json({ error: err.message });
      if (transactions.length === 0)
        return res.status(404).json({ message: "No transactions found" });

      res.json({ transactions });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get transactions by userId (Admin only)

transactionRouter.get(
  "/user/:UserId",
  authAndAuthorize(Roles.Admin),
  (req, res) => {
    try {
      const { UserId } = req.params;

      db.pool.query(
        getTransactionsByUserQuery,
        [UserId],
        (err, transactions) => {
          if (err) return res.status(400).json({ error: err.message });
          if (transactions.length === 0)
            return res
              .status(404)
              .json({ message: "No transactions found for this user" });

          res.json({ transactions });
        }
      );
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = transactionRouter;
