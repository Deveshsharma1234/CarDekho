const express = require("express");
const filterRouter = express.Router();
const db = require("../config/db");


filterRouter.get("/getFilter", (req,res)=>{
    const queryText = `SELECT *  FROM filters`;
  try {
    db.pool.execute(queryText, (err, rows) => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ success: true, data: rows });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
            
})

module.exports = filterRouter;