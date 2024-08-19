const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config');

mongoose.connect(MONGODB_URL);
mongoose.connection.on('connected', () => {
    console.log('Connected')
})
mongoose.connection.on('error', (error) => {
    console.log('some error occured')
})
require('./Models/user_model');
require('./Models/add-sales_model');

app.use(cors());
app.use(express.json());
app.use(require('./Routes/user_routes'));
app.listen(4000, () => {
    console.log('server started')
})