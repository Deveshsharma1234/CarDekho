const   express = require("express");

const  db = require( "../config/db.js");
const authAndAuthorize  = require( "../middlewares/authAndAuthorize.js");
const  Roles = require( "../utils/Roles/roles.js");
const {
    getPendingVerificationsQuery,
    updateVerificationStatusQuery,
    getVerificationStatusQuery,
} = require( "../utils/query/verification.js");

const verificationRouter = express.Router();

/*
 * Seller Verification APIs
 */

// 1️ Get pending verifications (Admin, Verifier)
verificationRouter.get("/pending", authAndAuthorize(Roles.Admin, Roles.Verifier), (req, res) => {
        try {
            db.pool.execute(getPendingVerificationsQuery, [], (err, rows) => {
                if (err) return res.status(400).json({ error: err.message });
                res.json(rows);
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// 2️ Approve/Reject verification (Admin, Verifier)
verificationRouter.patch("/:id", authAndAuthorize(Roles.Admin, Roles.Verifier),
    (req, res) => {
        try {
            const { id } = req.params;
            const { Status } = req.body; // expected values: "Approved", "Rejected"
            const VerifiedBy = req.user.UserId;
            const VerifiedAt = new Date();

            if (!Status || !["Approved", "Rejected"].includes(Status)) {
                return res.status(400).json({ message: "Invalid status" });
            }

            const values = [Status, VerifiedBy, VerifiedAt, id];

            db.pool.execute(updateVerificationStatusQuery, values, (err, result) => {
                if (err) return res.status(400).json({ error: err.message });

                res.json({
                    message: `Verification ${Status.toLowerCase()} successfully`,
                    affectedRows: result.affectedRows,
                });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

// 3️ Get verification status (Owner, Admin, Verifier)
verificationRouter.get("/:UserId",authAndAuthorize(Roles.Admin, Roles.Verifier, Roles.Citizen, Roles.Dealer),
    (req, res) => {
        try {
            const { UserId } = req.params;
            const user = req.user;

            // Citizen/Dealer can only see their own status
            if (
                [Roles.Citizen, Roles.Dealer].includes(user.RoleId) &&
                user.UserId != UserId
            ) {
                return res.status(403).json({ message: "Access denied" });
            }

            db.pool.execute(getVerificationStatusQuery, [UserId], (err, rows) => {
                if (err) return res.status(400).json({ error: err.message });
                if (!rows.length) {
                    return res.status(404).json({ message: "No verification found" });
                }
                res.json(rows[0]);
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

module.exports = verificationRouter;

