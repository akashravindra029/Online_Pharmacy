import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Login.css';

function AdminLogin() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Mock successful login - only allow admin login here
      const role = formData.email === 'admin@pharmacy.com' || formData.email === 'admin' ? 'admin' : null;
      if (role === 'admin') {
        const userData = {
          email: formData.email,
          name: formData.name,
          id: '12345',
          role: role
        };
        login(userData);
        setLoading(false);
        alert('Admin login successful!');
        navigate('/admin');
      } else {
        setLoading(false);
        alert('Invalid admin credentials. Please use admin email.');
      }
    }, 1500);
  };

  return (
    <div className="login-container fade-in">
      <div className="login-form">
        <h2>Admin Sign In</h2>
        <p>Enter your admin credentials to access the admin panel.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Admin Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter admin email (e.g., admin)"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In as Admin'}
          </button>
        </form>
        <p className="register-link">
          Not an admin? <a href="/">Go back to home</a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
