const mongoose = require('mongoose');

let productSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    fabric: String,
    colour: String,
    image: { type: String, default: "default.png" },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',       
    },
});

let productModel = mongoose.model("Product", productSchema);

module.exports = productModel;