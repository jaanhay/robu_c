import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    shippingInfo: {
      name: String,
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },
    products: [
      {
        product_name: String,
        qty: Number,
        price: Number,
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

const Order = mongoose.model('Order', orderSchema);

export default Order;