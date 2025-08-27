const express = require("express");
const router = express.Router();
const categoryModel = require("../../models/categories.model"); 
const upload = require("../../config/multerconfig");
const adminMiddleware = require("../../middlewares/admin-middleware");

router.get("/Add", adminMiddleware,(req, res) => {
    res.render("admin/categories/categories-add", { layout: 'layout' });
});



router.get("/Read", adminMiddleware,(req, res) => {
    res.redirect("/admin/categories/Read/1");
});

router.get("/Read/:page", adminMiddleware,async (req, res) => {
    let page = req.params.page;
    page = page ? Number(page) : 1; 
    let pageSize = 4; 
    
    let totalRecords = await categoryModel.countDocuments();
        let totalPages = Math.ceil(totalRecords / pageSize); 
        
        let categories = await categoryModel.find()
            .limit(pageSize)
            .skip((page - 1) * pageSize); 
        
        res.render("admin/categories/categories-read", {
            categories,
            currentPage: page,
            totalPages,
            totalRecords,
            pageSize
    });
    
});

//ADD
router.post("/create", adminMiddleware,upload.single('image'), async (req, res) => {
    const { name ,description } = req.body;

    const imagePath = `/images/${req.file.filename}`;
    await categoryModel.create({
        name, 
        image: imagePath,  
        description,
    });

    res.redirect("/admin/categories/Read"); 
});

//Delete
router.get("/Delete/:id", adminMiddleware,async (req, res) => {
    await categoryModel.findOneAndDelete({ _id: req.params.id });
    res.redirect("/admin/categories/Read"); 
});

//Edit
router.get("/Edit/:id", adminMiddleware,async (req, res) => {
    const category = await categoryModel.findOne({ _id: req.params.id });
    res.render("admin/categories/categories-edit", { category });
});

router.post("/update/:id", adminMiddleware,async (req, res) => {
    const { name, description } = req.body;

    await categoryModel.findOneAndUpdate(
        { _id: req.params.id },
        { name, description },
        { new: true }
    );

    res.redirect("/admin/categories/Read"); 
});

module.exports = router;
