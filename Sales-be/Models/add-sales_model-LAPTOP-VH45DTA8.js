const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
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
        ref: 'UserModel'
    }
},{
    timestamps: true
});

const PostModel = mongoose.model("PostModel", postSchema);

module.exports = PostModel;