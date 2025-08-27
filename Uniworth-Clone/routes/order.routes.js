const express = require('express');
const router = express.Router();
const Cart = require('../models/cart.model');  
const Order = require('../models/order.model'); 
const user = require("../models/user.model")

// Render Checkout Page
router.get('/checkout', async (req, res) => {
    const userId = req.user._id;  
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return res.redirect('/add-to-cart/cart');  
    }

    const totalBill = cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    res.render('Mainpage/checkout', {layout:false, cart, totalBill, username: req.user.username });
});

// Handle Checkout Submission
router.post('/checkout', async (req, res) => {
  const { name, phone, street, city, postalCode, paymentMethod } = req.body;
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });

  if (!cart || cart.items.length === 0) {
    return res.redirect('/add-to-cart/cart');
  }

  const totalBill = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const order = new Order({
    user: userId,
    items: cart.items,
    totalBill,
    paymentMethod,
    deliveryDetails: {
      name,
      phone,
      street,
      city,
      postalCode,
    },
    status: 'Order Placed',
  });

  await order.save();

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  res.render('MainPage/orderConfirmation', { layout: false, username: req.user.username, order });
});


module.exports = router;
