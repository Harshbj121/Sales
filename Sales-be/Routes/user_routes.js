const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserModel = mongoose.model("UserModel");
const DataModel = mongoose.model('DataModel');
const jsonwebtoken = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const bcryptjs = require("bcryptjs");
const protected = require("../Middleware/protected");

router.post('/registration', (req, res) => {
    const { FirstName, LastName, email, password } = req.body;
    if (!FirstName || !LastName || !email || !password) {
        return res.status(400).json({ error: "One or more field missing" });
    }
    UserModel.findOne({ email: email })
        .then((userInDb) => {
            if (userInDb) {
                return res.status(500).json({ error: "User With this email already exist" });
            }
            bcryptjs.hash(password, 16)
                .then((hashedPassword) => {
                    const user = new UserModel({ FirstName, LastName, email, password: hashedPassword });
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

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "One or more field missing" });
    }
    UserModel.findOne({ email: email })
        .then((userInDb) => {
            if (!userInDb) {
                return res.status(401).json({ error: "Invalid Credentials" });
            }
            bcryptjs.compare(password, userInDb.password)
                .then((didMatch) => {
                    if (didMatch) {
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

router.post('/addsales', protected, (req, res) => {
    const { productName, quantity, amount } = req.body;
    const data = new DataModel({ productName, quantity, amount });
    data.save()
        .then((newuser) => {
            res.status(201).json({ result: 'Data Added Successfully' })
        })
        .catch((err) => {
            res.status(500).json({ error: 'Server error' });
        })

});

router.get('/topsales', protected, async (req, res) => {
    const topSales = await DataModel.find({})
        .select('-_id')
        .sort({ amount: -1 })
        .limit(5);
    if (topSales == ""){
        res.status(200).json({ topsales: 0 });
    }
    res.json({topSales:topSales});
})

router.get('/totalrevenue', protected, async (req, res) => {
    try {
        const totalrevenue = await DataModel.aggregate([
            {
                $group: {
                    _id: null,
                    amount: { $sum: '$amount' }
                }
            }
        ]);

        if (totalrevenue.length > 0) {
            res.json({totalrevenue : totalrevenue[0].amount});
        } else {
            res.json({totalrevenue:`0`});
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router;
