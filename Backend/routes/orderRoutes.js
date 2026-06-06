const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// PLACE ORDER
router.post('/', protect, async (req, res) => {
  try {
    const { products, shippingAddress, paymentMethod, totalAmount } = req.body;
    const order = await Order.create({
      userId: req.user.id,
      products,
      shippingAddress,
      paymentMethod,
      totalAmount
    });
    // Clear cart after order
    await Cart.findOneAndDelete({ userId: req.user.id });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET MY ORDERS
router.get('/mine', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate('products.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL ORDERS (admin only)
router.get('/', protect, isAdmin, async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email').populate('products.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE ORDER STATUS (admin only)
router.put('/:id', protect, isAdmin, async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
