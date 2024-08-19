const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PostModel = mongoose.model('PostModel');
const protected = require("../Middleware/protected"); // Import middleware 

// post request to add a new sales entry
router.post('/addsales', protected, (req, res) => {
    const { productName, quantity, amount } = req.body;
    // req.user is set by the protected middleware
    const data = new PostModel({ productName: productName, quantity: quantity, amount: amount, author: req.user });
    data.save()
        .then((newSale) => {
            res.status(201).json({ newSale: newSale })
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        })

});

// GET request to fetch top 5 sales entries for current user
router.get('/topsales', protected, async (req, res) => {
    try {
        const topsales = await PostModel.find({ author: req.user._id }) // Find top 5 sales entries for current user
            .select('_id productName quantity amount')
            .sort({ amount: -1 })
            .limit(5);
        if (topsales.length === 0) {
            res.status(200).json({ topsales: [] }); // Respond with empty array if no sales entries found
        }
        res.json({ topsales: topsales }); // Respond with fetched topsales data
    } catch (error) {
        console.error('Error fetching top sales:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

})

// GET request to fetch today's total revenue for current user
router.get('/todayrevenue', protected, async (req, res) => {
    try {
        const startOfDay = new Date(); // Get current date
        startOfDay.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for start of day
        const endOfDay = new Date(); // Get current date
        endOfDay.setHours(23, 59, 59, 999); // Set hours, minutes, seconds, and milliseconds to end of day
        const todayrevenue = await PostModel.aggregate([
            {
                $match: {
                    author: req.user._id, // Filter by current user's _id
                    createdAt: { $gte: startOfDay, $lte: endOfDay } // Filter by today's date
                }
            }, {
                $group: {
                    _id: null,
                    amount: { $sum: '$amount' } // sum of all amount of filtered data
                }
            }
        ]);

        if (todayrevenue.length > 0) {
            res.json({ todayrevenue: todayrevenue[0].amount });
        } else {
            res.json({ todayrevenue: 0 });
        }
    } catch (err) {
        console.error("Error fetching today's revenue:", err);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router  // Export router with defined endpoints