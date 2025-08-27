const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.model');
const Product = require("../models/products.model");
const User = require("../models/user.model");
const  isAuthenticated = require('../middlewares/localuser-middleware');


// Add item to cart
router.post('/:productId',isAuthenticated,async (req, res) => {

    const productId = req.params.productId;
    const quantity = req.body.quantity || 1; 
    const userId = req.user._id; 

    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }


    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
  
      existingItem.quantity += quantity;
    } else {
     
      cart.items.push({
        product: productId,
        quantity: quantity,
        price: product.price,
      });
    }

    
    await cart.save();


    res.redirect('/add-to-cart/cart');
  
});


router.get('/cart',isAuthenticated,async (req, res) => {
  
    const userId = req.user._id; 
    const cart = await Cart.findOne({ user: userId }).populate('items.product').populate('user');
    
    if (!cart) {
      return res.render('MainPage/cart', { layout: false, cart: null });
    }

    res.render('MainPage/cart', { layout: false, cart, username: req.user.username });
  
});


// Route to update the quantity of an item in the cart
router.post('/cart/update', isAuthenticated, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  // Find the user's cart
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
      return res.status(404).send('Cart not found');
  }

  // Find the item in the cart
  const existingItem = cart.items.find(item => item.product.toString() === productId);
  if (existingItem) {
      // Update quantity
      existingItem.quantity = quantity;
      await cart.save();
  }

  // Redirect to the cart page after updating the quantity
  res.redirect('/add-to-cart/cart');
});

// Route to remove an item from the cart
router.post('/cart/remove', isAuthenticated, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  // Find the user's cart
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
      return res.status(404).send('Cart not found');
  }

  // Remove the item from the cart
  cart.items = cart.items.filter(item => item.product.toString() !== productId);
  await cart.save();

  // Redirect to the cart page after removal
  res.redirect('/add-to-cart/cart');
});

module.exports = router;
