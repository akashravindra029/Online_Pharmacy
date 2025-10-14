import React, { useState, useEffect } from 'react';
import '../styles/Settings.css';

function Settings() {
  const [settings, setSettings] = useState({
    lowStockThreshold: 20,
    currency: 'USD',
    taxRate: 0,
    shippingFee: 5.99,
    emailNotifications: true,
    lowStockAlerts: true,
    newOrderAlerts: true,
    storeName: 'Online Pharmacy',
    storeEmail: 'admin@pharmacy.com',
    storePhone: '+1-555-0123'
  });

  useEffect(() => {
    const storedSettings = localStorage.getItem('adminSettings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const saveSettings = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      lowStockThreshold: 20,
      currency: 'USD',
      taxRate: 0,
      shippingFee: 5.99,
      emailNotifications: true,
      lowStockAlerts: true,
      newOrderAlerts: true,
      storeName: 'Online Pharmacy',
      storeEmail: 'admin@pharmacy.com',
      storePhone: '+1-555-0123'
    };
    setSettings(defaultSettings);
  };

  return (
    <div className="settings">
      <div className="header">
        <h2>Settings</h2>
        <div className="actions">
          <button onClick={resetToDefaults} className="reset-btn">Reset to Defaults</button>
          <button onClick={saveSettings} className="save-btn">Save Settings</button>
        </div>
      </div>

      <div className="settings-sections">
        <div className="settings-section">
          <h3>Store Information</h3>
          <div className="form-group">
            <label>Store Name</label>
            <input
              type="text"
              name="storeName"
              value={settings.storeName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Store Email</label>
            <input
              type="email"
              name="storeEmail"
              value={settings.storeEmail}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Store Phone</label>
            <input
              type="tel"
              name="storePhone"
              value={settings.storePhone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Pricing & Currency</h3>
          <div className="form-group">
            <label>Currency</label>
            <select name="currency" value={settings.currency} onChange={handleInputChange}>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tax Rate (%)</label>
            <input
              type="number"
              name="taxRate"
              value={settings.taxRate}
              onChange={handleInputChange}
              min="0"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label>Shipping Fee</label>
            <input
              type="number"
              name="shippingFee"
              value={settings.shippingFee}
              onChange={handleInputChange}
              min="0"
              step="0.01"
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Inventory Settings</h3>
          <div className="form-group">
            <label>Low Stock Threshold</label>
            <input
              type="number"
              name="lowStockThreshold"
              value={settings.lowStockThreshold}
              onChange={handleInputChange}
              min="0"
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Notifications</h3>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={settings.emailNotifications}
                onChange={handleInputChange}
              />
              Enable Email Notifications
            </label>
          </div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="lowStockAlerts"
                checked={settings.lowStockAlerts}
                onChange={handleInputChange}
              />
              Low Stock Alerts
            </label>
          </div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                name="newOrderAlerts"
                checked={settings.newOrderAlerts}
                onChange={handleInputChange}
              />
              New Order Alerts
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>Data Management</h3>
          <div className="data-actions">
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all order data? This cannot be undone.')) {
                  localStorage.removeItem('orders');
                  alert('Order data cleared.');
                }
              }}
              className="danger-btn"
            >
              Clear Order History
            </button>
            <button
              onClick={() => {
                const data = {
                  products: JSON.parse(localStorage.getItem('products') || '[]'),
                  orders: JSON.parse(localStorage.getItem('orders') || '[]'),
                  settings: JSON.parse(localStorage.getItem('adminSettings') || '{}')
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'pharmacy-backup.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="export-btn"
            >
              Export All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
