const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const bcryptjs = require("bcryptjs");
const UserModel = require('../Models/user_model');

// POST request /registration - for user registration
router.post('/registration', (req, res) => {
    const { FirstName, LastName, email, password } = req.body;
    
    // Check if all required fields are present in request body
    if (!FirstName || !LastName || !email || !password) {
        return res.status(400).json({ error: "One or more field missing" });
    }
    // Check if user with the same email already exists
    UserModel.findOne({ email: email })
        .then((userInDb) => {
            if (userInDb) {
                return res.status(500).json({ error: "User With this email already exist" });
            }
            // Hash the password before saving it to database
            bcryptjs.hash(password, 10)
                .then((hashedPassword) => {
                    const user = new UserModel({ FirstName, LastName, email, password: hashedPassword });
                    // Save the new user to database
                    user.save()
                        .then((newuser) => {
                            res.status(201).json({ result: 'User Signed up Successfully' })
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {
            console.log(err);
        })
})

// POST request /login for user login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Check if email and password are present in request body
    if (!email || !password) {
        return res.status(400).json({ error: "One or more field missing" });
    }

    // Find user by email in database
    UserModel.findOne({ email: email })
        .then((userInDb) => {
            if (!userInDb) {
                return res.status(401).json({ error: "Invalid Credentials" });
            }

             // Compare hashed password from database with provided password
            bcryptjs.compare(password, userInDb.password)
                .then((didMatch) => {
                    if (didMatch) {
                        // Generate JWT token upon successful login
                        const jwtToken = jsonwebtoken.sign({ _id: userInDb._id }, JWT_SECRET);
                        const userInfo = { "email": userInDb.email, "fullname": userInDb.fullname, "pass": userInDb.password }
                        res.status(201).json({ result: { token: jwtToken, user: userInfo } });
                    }
                    else {
                        return res.status(401).json({ error: "Invalid Credentials" });
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        })
        .catch((err) => {

        })
})



module.exports = router;
