const mongoose =require('mongoose');

let categorieSchema = mongoose.Schema({
    name: {type: String, unique: true},
    image: { type: String, default: "default.png" },
    description: String,
});

let categoryModel = mongoose.model("Category" , categorieSchema);

module.exports = categoryModel;