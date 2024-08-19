const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DataModel = mongoose.model('DataModel');
const protected = require("../Middleware/protected");


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
    if (topSales == "") {
        res.status(200).json({ topsales: 0 });
    }
    res.json({ topSales: topSales });
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
            res.json({ totalrevenue: totalrevenue[0].amount });
        } else {
            res.json({ totalrevenue: `0` });
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
})