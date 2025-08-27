const express = require('express');
const router = express.Router();
const categoryModel = require("../../models/categories.model");
const productModel = require("../../models/products.model"); 

router.get('/', async (req, res) => {
    try {
        const categories = await categoryModel.find(); 
        res.render("MainPage/bootstrap", { layout: false, categories }); 
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get('/mainpage/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { search, sort, filter } = req.query;

        // Build the query object
        const query = { category: categoryId };

        // Add search functionality
        if (search) {
            query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
        }

        // Check for the filter value and update query accordingly
        if (filter) {
            // Handle price range filters
            if (filter.startsWith('price')) {
                const priceRange = filter.split('_')[1];
                const [minPrice, maxPrice] = priceRange.split('-');
                query.price = {};

                if (minPrice) query.price.$gte = Number(minPrice);
                if (maxPrice === '+') query.price.$gte = 50000; // For Rs 50000 and above
                else if (maxPrice) query.price.$lte = Number(maxPrice);
            }

            // Handle color filters
            if (filter.startsWith('colour')) {
                const colour = filter.split('_')[1];
                query.colour = colour;
            }
        }

        // Fetch products from the database
        let products = await productModel.find(query);

        // Add sorting functionality
        if (sort) {
            const sortOption = sort === 'priceAsc' ? { price: 1 } : { price: -1 }; // Sort by price
            products = await productModel.find(query).sort(sortOption);
        }

        res.render('MainPage/products', { layout: false, products, search, sort, filter, categoryId });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
});





router.get('/product/:productId', async (req, res) => {
    try {
        const { productId } = req.params;

        
        const product = await productModel.findById(productId).populate('category');

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.render('MainPage/productDetails', { layout: false, product });
    } catch (error) {
        console.error("Error fetching product details:", error);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
