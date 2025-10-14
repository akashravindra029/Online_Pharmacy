import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, Outlet, Navigate } from 'react-router-dom';
import '../styles/Admin.css';

function Admin() {
  const { isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAdmin()) {
    return <Navigate to="/admin-login" replace />;
  }

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>Admin Panel</h1>
        <button onClick={logout} className="logout-btn">Logout</button>
      </header>

      <nav className="admin-nav">
        <Link
          to="/admin"
          className={activeTab === 'dashboard' ? 'active' : ''}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/products"
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          Products
        </Link>
        <Link
          to="/admin/inventory"
          className={activeTab === 'inventory' ? 'active' : ''}
          onClick={() => setActiveTab('inventory')}
        >
          Inventory
        </Link>
        <Link
          to="/admin/orders"
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </Link>
        <Link
          to="/admin/customers"
          className={activeTab === 'customers' ? 'active' : ''}
          onClick={() => setActiveTab('customers')}
        >
          Customers
        </Link>
        <Link
          to="/admin/revenue"
          className={activeTab === 'revenue' ? 'active' : ''}
          onClick={() => setActiveTab('revenue')}
        >
          Analytics
        </Link>
        <Link
          to="/admin/reports"
          className={activeTab === 'reports' ? 'active' : ''}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </Link>
        <Link
          to="/admin/settings"
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </Link>
      </nav>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Admin;
