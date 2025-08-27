const express = require("express");
const router = express.Router();
const productModel = require("../../models/products.model");
const categoryModel = require("../../models/categories.model");
const upload = require("../../config/multerconfig");
const adminMiddleware = require("../../middlewares/admin-middleware");

// Add 
router.get("/Add",adminMiddleware, async (req, res) => {
    const categories = await categoryModel.find(); 
    res.render("admin/products/product-add", { categories, layout: 'layout' });
});

// Read 
router.get("/Read",adminMiddleware, (req, res) => {
    res.redirect("/admin/products/Read/1");
});

router.get("/Read/:page", adminMiddleware,async (req, res) => {
    let page = req.params.page;
    page = page ? Number(page) : 1; 
    let pageSize = 3; 
    
    let totalRecords = await productModel.countDocuments();
        let totalPages = Math.ceil(totalRecords / pageSize);
        
        let products = await productModel.find().populate('category')
            .limit(pageSize)
            .skip((page - 1) * pageSize);
        
        res.render("admin/products/product-read", {
            products,
            currentPage: page,
            totalPages,
            totalRecords,
            pageSize
    });
    
});



router.post("/create",adminMiddleware, upload.single('image'), async (req, res) => {
    const { name, description, colour, fabric ,price ,category } = req.body;

    const imagePath = `/images/${req.file.filename}`;

    await productModel.create({
        name,
        description,
        colour,
        fabric,
        price,
        image: imagePath,  
        category, 
    });
    res.redirect("/admin/products/Read");
});

// Delete
router.get("/Delete/:id", adminMiddleware,async (req, res) => {
    await productModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/admin/products/Read");
});

// Edit
router.get("/Edit/:id",adminMiddleware, async (req, res) => {
    const product = await productModel.findOne({ _id: req.params.id }).populate('category'); 
    const categories = await categoryModel.find(); 
    res.render("admin/products/product-edit", { product, categories });
});



router.post("/update/:id",adminMiddleware, async (req, res) => {
    const { name, description, colour, fabric ,price, category } = req.body;
    await productModel.findOneAndUpdate({ _id: req.params.id }, { name, description, price, colour, fabric ,category }, { new: true });
    res.redirect("/admin/products/Read");
});

module.exports = router;