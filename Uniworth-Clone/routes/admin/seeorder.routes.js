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

router.post("/:id/update", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await Order.findByIdAndUpdate(id, { status });

    res.redirect("/admin/orders/read"); // redirect back to orders page
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete order
router.post("/:id/delete", async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndDelete(id);

    res.redirect("/admin/orders/read"); // redirect back to orders page after deleting
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;
