import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// POST /api/orders
router.post('/', async (req, res) => {
    try {
      const { userId, shippingInfo, products } = req.body;
  
      console.log('Received order data:', { userId, shippingInfo, products });
  
      const order = new Order({user: userId, shippingInfo, products });
      await order.save();
  
      res.status(201).json({ message: 'Order saved', order });
    } catch (error) {
      console.error('Error saving order:', error);
      res.status(500).json({ message: 'Failed to save order', error: error.message });
    }
  });

export default router;
