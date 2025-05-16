import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
const Checkout = () => {
  const { user } = useAuth();
  const { cart } = useCart(); 
  const [shippingInfo, setShippingInfo] = useState(null); // null = not fetched yet
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchShipping = async () => {
      try {
        const userId = user._id;
        if (userId) {
          const { data } = await axios.get(`http://localhost:5000/api/shipping/${userId}`);
          if (data) {
            const { user: userId, ...rest } = data;
            setShippingInfo(rest); // this holds what's in DB
            setSaved(true);
          }
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          console.log('No saved shipping info yet');
          setSaved(false);
        } else {
          console.error('Error fetching shipping info:', err);
        }
      }
    };

    fetchShipping();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      let finalShippingInfo = shippingInfo;
      // Only save if not already saved
      if (!saved) {
        console.log('➡️ Shipping POST request data:', {
          ...formData,
          userId: user._id,
        });
        const response = await axios.post('http://localhost:5000/api/shipping', {
          ...formData,
          userId: user._id,
        });
        
        console.log('Shipping info saved!', response.data);
        setShippingInfo(response.data); // update UI
        setSaved(true);
        finalShippingInfo = response.data;
        alert('Shipping info saved and order placed!');
      } else {
        alert('Order placed using saved shipping info!');
      }
      const cartItems = cart.map(item => ({
        product_name: item.name,   // or item.title or item.product_name – depends on your schema
        qty: item.quantity,
        price: item.price,
      }));
      console.log('Sending order:', {
        userId: user._id,
        shippingInfo: finalShippingInfo,
        products: cartItems,
      });
      await axios.post('http://localhost:5000/api/orders', {
        userId: user._id,
        shippingInfo: finalShippingInfo,
        products: cartItems,
      });
      // You could also add logic here to POST to an "orders" API
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Try again!');
    }
  };

  return (
    <div className="checkout-form" style={{
      maxWidth: '500px',
      margin: '2rem auto',
      padding: '2rem',
      border: '1px solid #ccc',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      backgroundColor: '#fff'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>🚚 Shipping Information</h2>

      {saved && shippingInfo ? (
        <div style={{
          marginBottom: '1.5rem',
          padding: '1rem',
          backgroundColor: '#f0f8ff',
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}>
          <p><strong>We already have your shipping info:</strong></p>
          <ul style={{ paddingLeft: '1.2rem' }}>
            <li><strong>Name:</strong> {shippingInfo.name}</li>
            <li><strong>Address:</strong> {shippingInfo.address}</li>
            <li><strong>City:</strong> {shippingInfo.city}</li>
            <li><strong>Postal Code:</strong> {shippingInfo.postalCode}</li>
            <li><strong>Country:</strong> {shippingInfo.country}</li>
          </ul>
          <button
            onClick={handlePlaceOrder}
            style={{
              marginTop: '1rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '12px 24px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '100%',
              transition: '0.3s'
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          >
            ✅ Place Order
          </button>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }}>
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '6px',
                  border: '1px solid #ccc'
                }}
              />
            </div>
          ))}
          <button
            type="submit"
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '12px 24px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '100%',
              transition: '0.3s'
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
          >
            ✅ Save & Place Order
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
