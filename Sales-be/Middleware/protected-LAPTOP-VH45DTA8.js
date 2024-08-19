const mongoose = require('mongoose');
const UserModel = mongoose.model("UserModel");
const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
    const { authorization } = req.headers; // Extract Authorization header from request

    if (!authorization) { // If Authorization header is missing
        return res.status(401).json({ error: "user not logged in" });
    }
    const token = authorization.replace("Bearer ", "");  // Remove "Bearer " prefix from token
    jsonwebtoken.verify(token, JWT_SECRET, (error, payload) => {  // Remove "Bearer " prefix from token
        if (error) { // If verification fails (token invalid or expired)
            return res.status(400).json({ error: "user not logged in" });
        }
        const { _id } = payload; // Extract user ID (_id) from token payload
        UserModel.findById(_id)
            .then((dbUser) => {
                req.user = dbUser;
                next();  // Proceed to next middleware
            })
            .catch((err) => {
                console.error('Error finding user by ID:', err); // Log error if user retrieval fails
                return res.status(500).json({ error: "Server Error" }); // Respond with 500 Internal Server Error
            });
    })
}