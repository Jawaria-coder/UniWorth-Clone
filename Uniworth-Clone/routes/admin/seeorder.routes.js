const express = require('express');
const router = express.Router();
const Order = require('../../models/order.model'); 
const User = require('../../models/user.model');  
const adminMiddleware = require("../../middlewares/admin-middleware");

router.get('/read', adminMiddleware, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user')
            .populate('items.product')
            .sort({ createdAt: -1 }); // Sort by latest first

        res.render('admin/orders/order-read', { orders });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
