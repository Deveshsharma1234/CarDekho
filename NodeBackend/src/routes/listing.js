const express = require("express");
const db = require("../config/db");
const authAndAuthorize = require("../middlewares/authAndAuthorize");
const upload = require("../middlewares/carUploadConfig");
const {
    getAllListingsQuery,
    getListingByIdQuery,
    createListingQuery,
    addCarImagesQuery,
    updateListingQuery,
    deleteListingQuery,
    getListingsByDealerQuery,
    getCilyListedWithCar
} = require("../utils/query/listingQuery");

const listingRouter = express.Router();

    // Get all listings (searchable) with images as array
    listingRouter.get("/getAllListings",authAndAuthorize(1, 2, 3, 4, 5), (req, res) => {
        try {
          const { brand, model, city, minPrice, maxPrice } = req.query;
          let statement = getAllListingsQuery;
          const values = [];

          if (brand) {
            statement += " AND m.BrandId = ?";
            values.push(brand);
          }
          if (model) {
            statement += " AND l.ModelId = ?";
            values.push(model);
          }
          if (city) {
            statement += " AND l.CityId = ?";
            values.push(city);
          }
          if (minPrice) {
            statement += " AND l.Price >= ?";
            values.push(minPrice);
          }
          if (maxPrice) {
            statement += " AND l.Price <= ?";
            values.push(maxPrice);
          }

          statement += `
    GROUP BY l.ListingId, l.UserId, m.BrandId, b.BrandName, 
             l.ModelId, m.ModelName, m.FuelType, m.Transmission,
             l.RegistrationYear, l.Mileage, l.Price, l.CityId, 
             c.City, l.Description, l.CreatedDate, l.ModifiedDate, l.ActiveStatus
`;

          db.pool.query(statement, values, (err, listings) => {
            if (err) return res.status(400).json({ error: err.message });
            if (listings.length === 0)
              return res.status(404).json({ message: "No listings found" });

            // Convert images from comma-separated string to array
            const formattedListings = listings.map((listing) => ({
              ...listing,
              Images: listing.Images ? listing.Images.split(",") : [],
            }));

            res.json({ listings: formattedListings });
          });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
    );


// Get listing by ID with images as array
listingRouter.get("/ListingById/:ListingId", authAndAuthorize(1, 2, 3, 4, 5),
    (req, res) => {
        try {
            const { ListingId } = req.params;
            db.pool.query(getListingByIdQuery, [ListingId], (err, listings) => {
                if (err) return res.status(400).json({ error: err.message });
                if (listings.length === 0)
                    return res.status(404).json({ message: "Listing not found" });

                const listing = listings[0];
                listing.Images = listing.Images ? listing.Images.split(",") : [];

                res.json({ listing });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);
// Get City where car listed
listingRouter.get("/citiesWithCarListed",
    (req, res) => {
        try {
            db.pool.query(getCilyListedWithCar, (err, listings) => {
                if (err) return res.status(400).json({ error: err.message });
                if (listings.length === 0)
                    return res.status(404).json({ message: "No Cities found Having Listed Cars" });

                    res.json({ listings });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// POST /listCar
listingRouter.post('/listCar', authAndAuthorize(1, 2, 3), async (req, res) => {
    try {
        const user = req.user;
        const { ModelId, RegistrationYear, Mileage, Price, CityId, Description } = req.body;

        // Validate Registration Year
        if (RegistrationYear < 1901 || RegistrationYear > 2155) {
            return res.status(400).json({ error: "Invalid RegistrationYear" });
        }

        const values = [
            user.UserId,
            ModelId,
            RegistrationYear,
            Mileage,
            Price,
            CityId,
            Description,
            `${user.FirstName} ${user.LastName}`
        ];

        db.pool.execute(createListingQuery, values, (err, result) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            res.status(201).json({
                message: "Listing created successfully",
                ListingId: result.insertId
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /listCar/:ListingId/images
listingRouter.post('/listCar/:ListingId/images', authAndAuthorize(1, 2, 3), upload.array('images', 5), async (req, res) => {
    try {
        const { ListingId } = req.params;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No images uploaded" });
        }

        const images = req.files.map(file => [
            ListingId,
            `/uploads/carimages/${file.filename}`,
            new Date()
        ]);

        db.pool.query(addCarImagesQuery, [images], (err) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }

            res.status(201).json({
                message: "Images uploaded successfully",
                ListingId
            });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Update listing
listingRouter.patch(
    "/updateListing/:ListingId",
    authAndAuthorize(2, 3, 1),
    upload.array("images", 5),
    (req, res) => {
        try {
            const user = req.user;
            const { ListingId } = req.params;
            const {
              ModelId,
              RegistrationYear,
              Mileage,
              Price,
              CityId,
              Description,
            } = req.body;
            const ModifiedDate = new Date();
            const ModifiedBy = user.FirstName || "SYSTEM";

            const values = [
              ModelId,
              RegistrationYear,
              Mileage,
              Price,
              CityId,
              Description,
              ModifiedDate,
              ModifiedBy,
              ListingId,
              user.UserId,
            ];
            db.pool.execute(updateListingQuery, values, (err, result) => {
                if (err) return res.status(400).json({ error: err.message });
                if (result.affectedRows === 0)
                    return res
                        .status(404)
                        .json({ message: "Listing not found or you are not the owner" });

                // Handle new uploaded images
                if (req.files && req.files.length > 0) {
                    const images = req.files.map((file) => [
                        ListingId,
                        `/uploads/carimages/${file.filename}`,
                        new Date(),
                    ]);
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
    }
);

// Delete (soft delete) listing
listingRouter.delete(
    "/removeListing/:ListingId",
    authAndAuthorize(2, 3, 1),
    (req, res) => {
        try {
            const user = req.user;
            const { ListingId } = req.params;
            const values = [ListingId, user.UserId];

            db.pool.execute(deleteListingQuery, values, (err, result) => {
                if (err) return res.status(400).json({ error: err.message });
                if (result.affectedRows === 0)
                    return res
                        .status(404)
                        .json({ message: "Listing not found or you are not the owner" });

                res.json({ message: "Listing deleted successfully" });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// Get all listings of a specific dealer/seller

listingRouter.get("/dealer/:DealerId", authAndAuthorize(1, 3), (req, res) => {
    try {
        const { DealerId } = req.params;
        db.pool.query(getListingsByDealerQuery, [DealerId], (err, listings) => {
            if (err) return res.status(400).json({ error: err.message });
            if (listings.length === 0)
                return res
                    .status(404)
                    .json({ message: "No listings found for this dealer" });

            const formattedListings = listings.map((listing) => ({
                ...listing,
                Images: listing.Images ? listing.Images.split(",") : [],
            }));

            res.json({ listings: formattedListings });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = listingRouter;
