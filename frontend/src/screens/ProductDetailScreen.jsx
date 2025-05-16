import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetailScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useCart();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-detail-container">
    <div className="product-detail-image">
      <img src={product.image} alt={product.name} />
    </div>
    <div className="product-detail-info">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Stock:</strong> {product.countInStock}</p>
      <p className="product-detail-price">₹{product.price}</p>
      <button onClick={addToCart} className="add-to-cart-btn">Add to Cart</button>
    </div>
  </div>

  );
};

export default ProductDetailScreen;
