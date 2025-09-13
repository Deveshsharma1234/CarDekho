const express = require("express");
const filterRouter = express.Router();
const db = require("../config/db");
const { getCilyListedWithCar } = require("../utils/query/listingQuery");

// filterRouter.get("/getFilter", (req,res)=>{
//     const queryText = `SELECT *  FROM filters`;
//   try {
//     db.pool.execute(queryText, (err, rows) => {
//       if (err) return res.status(400).json({ error: err.message });
//       res.json({ success: true, data: rows });
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }

// })

filterRouter.get("/getFilter", async (req, res) => {
  try {
    const [filters] = await db.pool
      .promise()
      .query("SELECT * FROM filters WHERE is_active = 1");

    const results = await Promise.all(
      filters.map(async (f) => {
        let options = [];

        switch (f.filter_key) {
          case "brand": {
            const [rows] = await db.pool
              .promise()
              .query("SELECT BrandId, BrandName FROM carbrands");
            options = rows.map((r) => ({ id: r.BrandId, name: r.BrandName }));
            break;
          }

          case "model": {
            const [rows] = await db.pool
              .promise()
              .query("SELECT ModelId, ModelName FROM carmodels");
            options = rows.map((r) => ({ id: r.ModelId, name: r.ModelName }));
            break;
          }

          case "city":
            [rows] = await db.pool
              .promise()
              .query(getCilyListedWithCar);
            options = rows.map((r) => ({ id: r.CityID, name: r.City }));
            break;

          case "price": {
            const [rows] = await db.pool
              .promise()
              .query(
                "SELECT MIN(Price) as minPrice, MAX(Price) as maxPrice FROM carlistings"
              );
            const min = rows[0].minPrice || 0;
            const max = rows[0].maxPrice || 0;
            const q1 = Math.floor(max / 4);
            const q2 = Math.floor(max / 2);
            const q3 = Math.floor((3 * max) / 4);

            options = [
              { label: `0 - ${q1}`, range: [0, q1] },
              { label: `${q1} - ${q2}`, range: [q1, q2] },
              { label: `${q2} - ${q3}`, range: [q2, q3] },
              { label: `${q3}+`, range: [q3, max] },
            ];
            break;
          }

          case "year": {
            const [rows] = await db.pool
              .promise()
              .query(
                "SELECT DISTINCT RegistrationYear FROM carlistings ORDER BY RegistrationYear DESC"
              );
            options = rows.map((r) => ({
              id: r.RegistrationYear,
              name: r.RegistrationYear,
            }));
            break;
          }

          case "mileage": {
            const [rows] = await db.pool
              .promise()
              .query(
                "SELECT MIN(Mileage) as minM, MAX(Mileage) as maxM FROM carlistings"
              );
            const minM = rows[0].minM || 0;
            const maxM = rows[0].maxM || 0;
            const step = Math.floor(maxM / 3);

            options = [
              { label: `0 - ${step}`, range: [0, step] },
              { label: `${step} - ${2 * step}`, range: [step, 2 * step] },
              { label: `${2 * step}+`, range: [2 * step, maxM] },
            ];
            break;
          }

          default:
            options = [];
        }

        return { ...f, options };
      })
    );

    res.json({ success: true, data: results });
  } catch (error) {
    console.error("Filter API Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = filterRouter;
