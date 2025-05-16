import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { cart } = useCart();
    const { logout } = useAuth();
    const navigate = useNavigate();
  
    const handleLogout = () => {
      logout();
      navigate('/login');
    };
  
    return (
<div className="navbar">
       <div className="navbar-left">
       <h2 style={{ margin: 0, color: "#60a5fa" }}>Robu.in Clone</h2>
        <Link to="/" className="nav-link">🏠 Home</Link>
      </div>
      <div className="navbar-right">
       <Link to="/cart" className="nav-link">🛒 Cart ({Object.keys(cart).length})</Link>
      <button onClick={handleLogout} className="nav-btn">🚪 Log Out</button>
      </div>
    </div>);
};
export default Navbar;