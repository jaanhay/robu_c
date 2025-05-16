// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  specs: { type: String }, // optional for now
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ['controllers', 'batteries', 'electronic components', 'motors'],
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
