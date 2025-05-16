import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate,useLocation } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import Checkout from './screens/Checkout';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen'; 
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

const AppLayout = () => {
  const location = useLocation();
  const { user } = useAuth();
  // Hide navbar on login & register pages
  const hideNavbarPaths = ['/login', '/register'];
  const hideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div style={{ paddingTop: hideNavbar ? '0' : '80px' }}>
        <Routes>
        <Route path="/" element={user ? <Navigate to="/products" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/products" element={user ? <ProductScreen /> : <Navigate to="/login" />} />
      <Route path="/products/:id" element={<ProductDetailScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </>
  );
};
function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
