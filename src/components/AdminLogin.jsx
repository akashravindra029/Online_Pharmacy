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
      // Check against stored admin data
      const admins = JSON.parse(localStorage.getItem('admins')) || [];
      const admin = admins.find(a => a.email === formData.email && a.password === formData.password);

      if (admin) {
        const userData = {
          email: admin.email,
          name: admin.name,
          id: admin.id,
          role: admin.role
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
          Don't have an admin account? <a href="/admin-register">Register here</a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
