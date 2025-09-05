const express = require("express");
const carsRouter = express.Router();
const db = require("../config/db");
const authAndAuthorize = require("../middlewares/authAndAuthorize");
const Roles = require("../utils/Roles/roles");
const {
  getAllBrandsQuery,
  getModelsByBrandIdQuery,
  createBrandQuery,
  createModelQuery,
} = require("../utils/query/carQuery");

// Get all car brands
carsRouter.get("/brands", (req, res) => {
  try {
    db.pool.execute(getAllBrandsQuery, (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ success: true, data: rows });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all models by brandId
carsRouter.get("/models/:brandId", (req, res) => {
  const { brandId } = req.params;
  try {
    db.pool.execute(getModelsByBrandIdQuery, [brandId], (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ success: true, data: rows });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add new brand (Admin & SupportStaff only)
carsRouter.post(
  "/brands",
  authAndAuthorize(Roles.Admin, Roles.SupportStaff),
  (req, res) => {
    const { BrandName } = req.body;
    try {
      db.pool.execute(createBrandQuery, [BrandName], (err, result) => {
        if (err) return res.status(400).json({ error: err.message });

        res.status(201).json({
          success: true,
          brandId: result.insertId,
          BrandName,
        });
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);


carsRouter.post("/models", authAndAuthorize(Roles.Admin, Roles.SupportStaff),
  (req, res) => {
    const { brandId, name, fuelType, transmission, bodyType } = req.body;

    if (!brandId || !name) {
      return res.status(400).json({ error: "BrandId and ModelName are required" });
    }

    try {
      db.pool.execute(
        `  INSERT INTO carmodels 
  (BrandId, ModelName, FuelType, Transmission, BodyType, CreatedDate) 
  VALUES (?, ?, ?, ?, ?, NOW())`,
        [brandId, name, fuelType || null, transmission || null, bodyType || null],
        (err, result) => {
          if (err) return res.status(400).json({ error: err.message });

          res.status(201).json({
            success: true,
            modelId: result.insertId,
            brandId,
            name,
            fuelType: fuelType || null,
            transmission: transmission || null,
            bodyType: bodyType || null,
          });
        }
      );
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

module.exports = carsRouter;
