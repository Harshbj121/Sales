const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config'); // Import MongoDB URL from configuration

// Connect to MongoDB database
mongoose.connect(MONGODB_URL);
mongoose.connection.on('connected', () => {
    console.log('Connected')
})

// if error while connecting to mongodb
mongoose.connection.on('error', (error) => {
    console.log('some error occured')
})

// Importing mongoose models
require('./Models/user_model');
require('./Models/add-sales_model');

// Middleware
app.use(cors());
app.use(express.json());

// importing user and post routes 
app.use(require('./Routes/user_routes'));
app.use(require('./Routes/post_routes'));

// Starting server on port 4000
app.listen(4000, () => {
    console.log('server started')
})