import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
const LoginScreen = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data.user));
      login(data.user);
      navigate('/products');
      setMessage('Login successful!');
      // Redirect to homepage or dashboard
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h1 className="robu-title">Welcome to Robu</h1>
      <p className="robu-subtitle">A basic version of Robu.in</p>

      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        <p className="message">{message}</p>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
