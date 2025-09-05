const express = require('express');
const db = require('../config/db');
const authAndAuthorize = require('../middlewares/authAndAuthorize');
const upload = require('../middlewares/carUploadConfig');
const {
    getAllListingsQuery,
    getListingByIdQuery,
    createListingQuery,
    addCarImagesQuery,
    updateListingQuery,
    deleteListingQuery,
    getListingsByDealerQuery
} = require('../utils/query/listingQuery');

const listingRouter = express.Router();


// Get all listings (searchable) with images as array
listingRouter.get('/', authAndAuthorize(1, 2, 3, 4, 5), (req, res) => {
    try {
        const { brand, model, city, minPrice, maxPrice } = req.query;
        let statement = getAllListingsQuery;
        const values = [];

        if (brand) { statement += " AND BrandId = ?"; values.push(brand); }
        if (model) { statement += " AND ModelId = ?"; values.push(model); }
        if (city) { statement += " AND CityID = ?"; values.push(city); }
        if (minPrice) { statement += " AND Price >= ?"; values.push(minPrice); }
        if (maxPrice) { statement += " AND Price <= ?"; values.push(maxPrice); }

        db.pool.query(statement, values, (err, listings) => {
            if (err) return res.status(400).json({ error: err.message });
            if (listings.length === 0) return res.status(404).json({ message: "No listings found" });

            // Convert images from comma-separated string to array
            const formattedListings = listings.map(listing => ({
                ...listing,
                Images: listing.Images ? listing.Images.split(',') : []
            }));

            res.json({ listings: formattedListings });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get listing by ID with images as array
listingRouter.get('/:ListingId', authAndAuthorize(1, 2, 3, 4, 5), (req, res) => {
    try {
        const { ListingId } = req.params;
        db.pool.query(getListingByIdQuery, [ListingId], (err, listings) => {
            if (err) return res.status(400).json({ error: err.message });
            if (listings.length === 0) return res.status(404).json({ message: "Listing not found" });

            const listing = listings[0];
            listing.Images = listing.Images ? listing.Images.split(',') : [];

            res.json({ listing });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new listing with images
listingRouter.post('/', authAndAuthorize(2, 3), upload.array('images', 5), (req, res) => {
    try {
        const user = req.user;
        const { BrandId, ModelId, Year, Mileage, FuelType, Transmission, Price, CityID, Description } = req.body;
        const CreatedDate = new Date();

        const values = [user.UserId, BrandId, ModelId, Year, Mileage, FuelType, Transmission, Price, CityID, Description, CreatedDate, user.FirstName +" "+user.LastName ];
        db.pool.execute(createListingQuery, values, (err, result) => {
            if (err) return res.status(400).json({ error: err.message });

            const ListingId = result.insertId;

            // Handle uploaded images
            if (req.files && req.files.length > 0) {
                const images = req.files.map(file => [ListingId, `/uploads/carimages/${file.filename}`, new Date()]);
                db.pool.query(addCarImagesQuery, [images], (err2) => {
                    if (err2) return res.status(400).json({ error: err2.message });
                    return res.status(201).json({ message: "Listing created with images", ListingId });
                });
            } else {
                res.status(201).json({ message: "Listing created", ListingId });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update listing
listingRouter.patch('/:ListingId', authAndAuthorize(2, 3, 1), upload.array('images', 5),  (req, res) => {
    try {
        const user = req.user;
        const { ListingId } = req.params;
        const { BrandId, ModelId, Year, Mileage, FuelType, Transmission, Price, CityID, Description } = req.body;
        const ModifiedDate = new Date();
        const ModifiedBy = user.FirstName || "SYSTEM";

        const values = [BrandId, ModelId, Year, Mileage, FuelType, Transmission, Price, CityID, Description, ModifiedDate, ModifiedBy, ListingId, user.UserId];
         db.pool.execute(updateListingQuery, values, (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Listing not found or you are not the owner" });

            // Handle new uploaded images
            if (req.files && req.files.length > 0) {
                const images = req.files.map(file => [ListingId, `/uploads/carimages/${file.filename}`, new Date()]);
                db.pool.query(addCarImagesQuery, [images], (err2) => {
                    if (err2) console.error(err2.message);
                    // Images uploaded, but main update is successful
                    res.json({ message: "Listing updated with new images" });
                });
            } else {
                res.json({ message: "Listing updated successfully" });
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete (soft delete) listing
listingRouter.delete('/:ListingId', authAndAuthorize(2, 3, 1), (req, res) => {
    try {
        const user = req.user;
        const { ListingId } = req.params;
        const values = [ListingId, user.UserId];

        db.pool.execute(deleteListingQuery, values, (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Listing not found or you are not the owner" });

            res.json({ message: "Listing deleted successfully" });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get all listings of a specific dealer/seller

listingRouter.get('/dealer/:DealerId', authAndAuthorize(1, 3), (req, res) => {
    try {
        const { DealerId } = req.params;
        db.pool.query(getListingsByDealerQuery, [DealerId], (err, listings) => {
            if (err) return res.status(400).json({ error: err.message });
            if (listings.length === 0) return res.status(404).json({ message: "No listings found for this dealer" });

            const formattedListings = listings.map(listing => ({
                ...listing,
                Images: listing.Images ? listing.Images.split(',') : []
            }));

            res.json({ listings: formattedListings });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = listingRouter;
