const mongoose = require('mongoose');


// Defines what a product schema should look like
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
});

// Defines how the schema is used to construct a model (JavaScript object)
module.exports = mongoose.model('Product', productSchema)