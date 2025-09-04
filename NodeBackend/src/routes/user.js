const express = require('express');
const db = require('../config/db')
const authAndAuthorize = require('../middlewares/authAndAuthorize');
const { getAllUsersQuery, getUserByIdQuery, updateUserQuery, softDeleteByIdQuery } = require('../utils/query/userQuery');
const Roles = require('../utils/Roles/roles');
const userRouter = express.Router();
const profileUpload = require('../middlewares/profileUploadConfig');

userRouter.get("/getAllUsers", authAndAuthorize(Roles.Admin, Roles.Verifier,Roles.Dealer, Roles.SupportStaff), (req, res) => {
    try {
        const statement =getAllUsersQuery
        db.pool.query(statement, (error, users) => {
            if (error) res.status(400).json({ error: error.message })
            if (users.length == 0) res.status(404).json({ message: "Users not found" });
            res.json({
                users: users
            })
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})

// to get other users profile by admin , gov officer and rep only
userRouter.get("/user/:UserId", authAndAuthorize(Roles.Admin, Roles.Verifier,Roles.Dealer, Roles.SupportStaff), (req, res) => {
    try {
        const { UserId } = req.params;
        const statement = getUserByIdQuery
        db.pool.query(statement, [UserId], (error, users) => {
            if (error) res.status(400).json({ error: error.message })
            if (users.length == 0) res.status(404).json({ message: "Users not found" });
            const user = users[0];
            res.json({
                user: user
            })

        })
    } catch (error) {
        res.status(400).json({ error: error.message })

    }

})

// get users  profile
userRouter.get("/getProfile", authAndAuthorize(Roles.Admin, Roles.Verifier,Roles.Dealer, Roles.SupportStaff, Roles.Citizen), (req, res) => {
    try {

        const User = req.user;
        res.json({
            message: "User profile retrieved",
            user: User

        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//udate self
userRouter.patch("/user", authAndAuthorize(1, 2), (req, res) => {
    try {
        const user = req.user;
        const {
            FirstName,
            LastName,
            Phone,
            Address,
            Pincode,
            State,
            District,
            City
        } = req.body;

        const ModifiedDate = new Date();
        let ModifiedBy;
        if (user.RoleId == 1) ModifiedBy = "Admin";
        if (user.RoleId == 2) ModifiedBy = "Government Representative";
        if (user.RoleId == 3) ModifiedBy = "Government emp "
        if (user.RoleId == 4) ModifiedBy = FirstName;
        else {
            ModifiedBy = "SYSTEM"
        }

        const updateQuery = updateUserQuery
        const values = [
            FirstName,
            LastName,
            Phone,
            Address,
            Pincode,
            State,
            District,
            City,
            ModifiedDate,
            ModifiedBy,
            user.UserId
        ];

        db.pool.execute(updateQuery, values, (err, result) => {
            if (err) return res.status(400).json({ error: err.message });

            // Now fetch the updated user
            db.pool.execute(`SELECT UserId, FirstName, LastName, Email, Phone, Address, Pincode, State, District, City, RoleId,ActiveState, ModifiedDate, ModifiedBy FROM users WHERE UserId = ?`,
                [user.UserId],
                (err2, rows) => {
                    if (err2) return res.status(500).json({ error: err2.message });

                    res.json({
                        message: "User profile updated successfully",
                        updatedUser: rows[0]
                    });
                });
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//update image/profile
userRouter.patch('/profile-picture', authAndAuthorize(1,2,3,4,5), profileUpload.single('profile'), (req, res) => {
    const user = req.user;
    if (!req.file) return res.status(400).json({ message: "No image uploaded" });

    const profileImagePath = `/uploads/profiles/${req.file.filename}`;

    const query = `UPDATE users SET ProfileImage = ?, ModifiedDate = NOW(), ModifiedBy = ? WHERE UserId = ?`;
    const values = [profileImagePath, user.FirstName || "SYSTEM", user.UserId];

    db.pool.execute(query, values, (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: "Profile picture updated successfully", profileImagePath });
    });
});

userRouter.delete("/user", authAndAuthorize(Roles.Admin, Roles.Citizen,Roles.Dealer,Roles.SupportStaff, Roles.Verifier), (req, res) => {
    try {
        const user = req.user;
        const statement = softDeleteByIdQuery;
        db.pool.execute(statement, [user.UserId], (error, result) => {
            if (error) res.status(400).json({ error: error.message })
            res.json({
                message: "User Deactivated",
                result: result
            })

        })


    } catch (error) {
        res.status(400).json({ error: error.message })

    }
})
// User blocked by admin only
userRouter.delete("/user/:UserId", authAndAuthorize(Roles.Admin), (req, res) => {
    const { UserId } = req.params;

    const statement = softDeleteByIdQuery;

    db.pool.execute(statement, [UserId], (error, result) => {
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found or already deactivated" });
        }
        return res.status(200).json({
            message: "User Deactivated",
            result
        });
    });
});

module.exports = userRouter;