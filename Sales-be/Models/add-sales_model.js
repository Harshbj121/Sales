const mongoose = require('mongoose');
const user_model = require('./user_model');
const dataSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user_model
    }
});

module.exports = mongoose.model("DataModel", dataSchema)