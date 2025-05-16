import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import '../CartScreen.css'; // Add the CSS file
const CartScreen = () => {
  const { cart, dispatch } = useCart();

  const increment = (id) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: id });
  };

  const decrement = (id) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: id });
  };

  const remove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2 className="cart-title">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-image" />
            <div className="cart-details">
              <h3>{item.name}</h3>
              <p>₹{item.price}</p>
              <div className="quantity-controls">
                <button onClick={() => decrement(item._id)} className="qty-btn">−</button>
                <span>{item.quantity}</span>
                <button onClick={() => increment(item._id)} className="qty-btn">+</button>
              </div>
              <button onClick={() => remove(item._id)} className="remove-btn">
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <>
        <div className="cart-total">
        <h3>Total: ₹{totalAmount}</h3>
      </div>
        <div className="checkout-button-container">
          <Link to="/checkout">
            <button className="checkout-btn">
              🧾 Proceed to Checkout
            </button>
          </Link>
        </div>
        </>
      )}
    </div>
  );
};

export default CartScreen;