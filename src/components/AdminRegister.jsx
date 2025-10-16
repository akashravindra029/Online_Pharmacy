import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function AdminRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('⚠️ Passwords do not match!');
      return;
    }

    setLoading(true);

    // Simulate API call for admin registration
    setTimeout(() => {
      // Store admin data in localStorage
      const admins = JSON.parse(localStorage.getItem('admins')) || [];
      const newAdmin = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'admin'
      };
      admins.push(newAdmin);
      localStorage.setItem('admins', JSON.stringify(admins));

      alert('✅ Admin registration successful! Please login.');
      setLoading(false);
      navigate('/admin-login');
    }, 1500);
  };

  return (
    <div className="register-container fade-in">
      <div className="register-form">
        <h2>Admin Registration</h2>
        <p>Create an admin account to access the admin panel.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
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
              placeholder="Enter admin email"
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
              required
              placeholder="Create a password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            {loading ? 'Registering...' : 'Register as Admin'}
          </button>
        </form>

        <p className="login-link">
          Already have an admin account? <a href="/admin-login">Login here</a>
        </p>
      </div>
    </div>
  );
}

export default AdminRegister;
