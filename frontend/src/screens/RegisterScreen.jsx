import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import { Link } from 'react-router-dom';
import '../LoginScreen.css';
const RegisterScreen = () => {
    const { login } = useAuth(); 
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
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
        const { data } = await axios.post('http://localhost:5000/api/auth/register', formData);
        login(data);
        alert('Registration successful! Please log in.');
        navigate('/login');
      setMessage('Registration successful! You can now log in.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <h1 className="robu-title">Welcome to Robu</h1>
      <p className="robu-subtitle">A basic version of Robu.in</p>

      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
        <p className="message">{message}</p>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
