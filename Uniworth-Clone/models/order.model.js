const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalBill: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cash_on_delivery', 'online_payment'], required: true },
  deliveryDetails: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
  },
  status: { type: String, default: 'Order Placed' },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
