const express = require("express");
const db = require("../config/db");
const authAndAuthorize = require("../middlewares/authAndAuthorize");
const {
    addToWishlistQuery,
    removeFromWishlistQuery,
    getWishlistByUserQuery
} = require("../utils/query/wishlistQuery");

const wishlistRouter = express.Router();


// Add listing to wishlist
wishlistRouter.post("/", authAndAuthorize(2, 3), (req, res) => {
    try {
        const user = req.user;
        const { ListingId } = req.body;

        if (!ListingId) {
            return res.status(400).json({ message: "ListingId is required" });
        }

        const CreatedDate = new Date();
        const values = [user.UserId, ListingId, CreatedDate, "SYSTEM"];

        db.pool.execute(addToWishlistQuery, values, (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ message: "Already in wishlist" });
                }
                return res.status(400).json({ error: err.message });
            }

            res.status(201).json({
                message: "Added to wishlist",
                WishlistId: result.insertId
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Remove listing from wishlist
wishlistRouter.delete("/:ListingId", authAndAuthorize(2, 3), (req, res) => {
    try {
        const user = req.user;
        const { ListingId } = req.params;

        db.pool.execute(removeFromWishlistQuery, [user.UserId, ListingId], (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Listing not found in wishlist" });
            }

            res.json({ message: "Removed from wishlist" });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get own wishlist
wishlistRouter.get("/", authAndAuthorize(2, 3), (req, res) => {
    try {
        const user = req.user;

        db.pool.query(getWishlistByUserQuery, [user.UserId], (err, wishlist) => {
            if (err) return res.status(400).json({ error: err.message });
            if (wishlist.length === 0) {
                return res.status(404).json({ message: "Your wishlist is empty" });
            }

            res.json({ wishlist });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = wishlistRouter;
