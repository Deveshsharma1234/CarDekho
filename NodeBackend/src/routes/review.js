// routes/reviewRouter.js
const express = require("express");
const   db = require("../config/db");
const  authAndAuthorize = require( "../middlewares/authAndAuthorize.js");
const  Roles = require( "../utils/Roles/roles.js");
const  {
  createCarReviewQuery,
  createSellerReviewQuery,
  getCarReviewsQuery,
  getSellerReviewsQuery,
} = require( "../utils/query/reviewQuery.js");

const reviewRouter = express.Router();

/**
 * ====================
 * Review APIs
 * ====================
 */

// 1️ Post car review (Citizen, Dealer)
reviewRouter.post(
  "/car",
  authAndAuthorize(Roles.Citizen, Roles.Dealer),
  (req, res) => {
    try {
      const user = req.user;
      const { ListingId, Rating, Comment } = req.body;
      const CreatedAt = new Date();

      if (!ListingId || !Rating) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const values = [ListingId, user.UserId, Rating, Comment || null, CreatedAt];

      db.pool.execute(createCarReviewQuery, values, (err, result) => {
        if (err) return res.status(400).json({ error: err.message });

        res.status(201).json({
          message: "Car review posted successfully",
          ReviewId: result.insertId,
        });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// 2️ Post seller review (Citizen, Dealer)
reviewRouter.post(
  "/seller",
  authAndAuthorize(Roles.Citizen, Roles.Dealer),
  (req, res) => {
    try {
      const user = req.user;
      const { SellerId, Rating, Comment } = req.body;
      const CreatedAt = new Date();

      if (!SellerId || !Rating) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const values = [SellerId, user.UserId, Rating, Comment || null, CreatedAt];

      db.pool.execute(createSellerReviewQuery, values, (err, result) => {
        if (err) return res.status(400).json({ error: err.message });

        res.status(201).json({
          message: "Seller review posted successfully",
          ReviewId: result.insertId,
        });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// 3 Get car reviews (All)
reviewRouter.get("/car/:ListingId", (req, res) => {
  try {
    const { ListingId } = req.params;

    db.pool.execute(getCarReviewsQuery, [ListingId], (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4️ Get seller reviews (All)
reviewRouter.get("/seller/:SellerId", (req, res) => {
  try {
    const { SellerId } = req.params;

    db.pool.execute(getSellerReviewsQuery, [SellerId], (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json(rows);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = reviewRouter;

