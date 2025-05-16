import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import '../ProductScreen.css';
const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cart, dispatch } = useCart();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Go to Cart button */}
      
  
      {loading && <div>Loading products...</div>}
      {error && <div className="error-message">{error}</div>}
      
      <div className="product-grid">
      {['controllers', 'batteries', 'electronic components', 'motors'].map((category) => (
  <div key={category} style={{ marginBottom: '3rem' }}>
    <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
    <div className="product-grid">
      {products
        .filter((product) => product.category === category)
        .map((product) => (
          <div key={product._id} className="product-card">
            <Link to={`/products/${product._id}`}>
              <div
                style={{
                  height: '180px',
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '12px 12px 0 0'
                }}
              />
              <div style={{ padding: '1rem' }}>
                <h3>{product.name}</h3>
                <p>₹{product.price}</p>
              </div>
            </Link>
            <button
              onClick={() => addToCart(product)}
              className="add-to-cart-btn"
              style={{ width: '100%' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
    </div>
  </div>
))}

     </div>

     <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
  <Link to="/checkout">
    <button
      style={{
        backgroundColor: '#ef4444',
        color: 'white',
        padding: '12px 24px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: '0.3s',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)'
      }}
      onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
      onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
    >
      🧾 Proceed to Checkout
    </button>
  </Link>
</div>
</div>  
  );
};

export default ProductScreen;
