const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Adding connections to different handlers
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders')

// Connecting to MongoDB cloud database
mongoose.connect('mongodb+srv://kevinlim6459:' + process.env.MONGO_ATLAS_PW + '@restful-api.lphvotq.mongodb.net/?retryWrites=true&w=majority&appName=RESTful-API');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Adding access control headers to all incoming PUT, POST, PATCH, DELETE, and GET requests
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Forwarding requests with specific url stems to corresponding handlers
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// If no matching url stem, create error object and pass to error handler
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// If a request comes in with an error object, throw the error and return the error object
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;