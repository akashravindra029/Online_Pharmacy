import React, { useState, useEffect } from 'react';
import '../styles/Reports.css';

function Reports() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('30');

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    const storedProducts = localStorage.getItem('products');

    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const getFilteredOrders = () => {
    const now = new Date();
    const days = parseInt(dateRange);
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    return orders.filter(order => new Date(order.date) >= cutoffDate);
  };

  const generateSalesReport = () => {
    const filteredOrders = getFilteredOrders();
    const dailySales = {};
    const productSales = {};
    const categorySales = {};

    filteredOrders.forEach(order => {
      const date = new Date(order.date).toISOString().split('T')[0];
      dailySales[date] = (dailySales[date] || 0) + (parseFloat(order.total) || 0);

      order.items?.forEach(item => {
        productSales[item.name] = (productSales[item.name] || 0) + item.quantity;

        const product = products.find(p => p.name === item.name);
        if (product) {
          categorySales[product.category] = (categorySales[product.category] || 0) + (parseFloat(item.price) * parseFloat(item.quantity));
        }
      });
    });

    return { dailySales, productSales, categorySales, totalOrders: filteredOrders.length };
  };

  const generateInventoryReport = () => {
    const lowStock = products.filter(p => parseInt(p.stock) <= 20);
    const outOfStock = products.filter(p => parseInt(p.stock) === 0);
    const totalValue = products.reduce((sum, p) => sum + (parseFloat(p.price) * parseInt(p.stock)), 0);

    const categoryInventory = {};
    products.forEach(product => {
      categoryInventory[product.category] = (categoryInventory[product.category] || 0) + parseInt(product.stock);
    });

    return { lowStock, outOfStock, totalValue, categoryInventory };
  };

  const exportReport = (data, filename) => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderSalesReport = () => {
    const { dailySales, productSales, categorySales, totalOrders } = generateSalesReport();
    const totalRevenue = Object.values(dailySales).reduce((sum, rev) => sum + rev, 0);

    return (
      <div className="report-content">
        <div className="report-summary">
          <div className="summary-item">
            <h3>Total Revenue</h3>
            <p>${totalRevenue.toFixed(2)}</p>
          </div>
          <div className="summary-item">
            <h3>Total Orders</h3>
            <p>{totalOrders}</p>
          </div>
          <div className="summary-item">
            <h3>Average Order Value</h3>
            <p>${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}</p>
          </div>
        </div>

        <div className="report-section">
          <h3>Daily Sales</h3>
          <div className="data-list">
            {Object.entries(dailySales)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([date, revenue]) => (
                <div key={date} className="data-item">
                  <span>{date}</span>
                  <span>${revenue.toFixed(2)}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="report-section">
          <h3>Top Products</h3>
          <div className="data-list">
            {Object.entries(productSales)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 10)
              .map(([product, quantity]) => (
                <div key={product} className="data-item">
                  <span>{product}</span>
                  <span>{quantity} units</span>
                </div>
              ))}
          </div>
        </div>

        <div className="report-section">
          <h3>Sales by Category</h3>
          <div className="data-list">
            {Object.entries(categorySales)
              .sort(([, a], [, b]) => b - a)
              .map(([category, revenue]) => (
                <div key={category} className="data-item">
                  <span>{category}</span>
                  <span>${revenue.toFixed(2)}</span>
                </div>
              ))}
          </div>
        </div>

        <button
          onClick={() => exportReport({ dailySales, productSales, categorySales, totalRevenue, totalOrders }, 'sales-report.json')}
          className="export-btn"
        >
          Export Sales Report
        </button>
      </div>
    );
  };

  const renderInventoryReport = () => {
    const { lowStock, outOfStock, totalValue, categoryInventory } = generateInventoryReport();

    return (
      <div className="report-content">
        <div className="report-summary">
          <div className="summary-item">
            <h3>Total Inventory Value</h3>
            <p>${totalValue.toFixed(2)}</p>
          </div>
          <div className="summary-item">
            <h3>Low Stock Items</h3>
            <p>{lowStock.length}</p>
          </div>
          <div className="summary-item">
            <h3>Out of Stock</h3>
            <p>{outOfStock.length}</p>
          </div>
        </div>

        <div className="report-section">
          <h3>Low Stock Alert (≤20 units)</h3>
          <div className="data-list">
            {lowStock.map(product => (
              <div key={product.name} className="data-item alert">
                <span>{product.name}</span>
                <span>{product.stock} units</span>
              </div>
            ))}
          </div>
        </div>

        <div className="report-section">
          <h3>Out of Stock</h3>
          <div className="data-list">
            {outOfStock.map(product => (
              <div key={product.name} className="data-item danger">
                <span>{product.name}</span>
                <span>0 units</span>
              </div>
            ))}
          </div>
        </div>

        <div className="report-section">
          <h3>Inventory by Category</h3>
          <div className="data-list">
            {Object.entries(categoryInventory)
              .sort(([, a], [, b]) => b - a)
              .map(([category, stock]) => (
                <div key={category} className="data-item">
                  <span>{category}</span>
                  <span>{stock} units</span>
                </div>
              ))}
          </div>
        </div>

        <button
          onClick={() => exportReport({ lowStock, outOfStock, totalValue, categoryInventory }, 'inventory-report.json')}
          className="export-btn"
        >
          Export Inventory Report
        </button>
      </div>
    );
  };

  return (
    <div className="reports">
      <div className="header">
        <h2>Reports & Analytics</h2>
        <div className="report-controls">
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="sales">Sales Report</option>
            <option value="inventory">Inventory Report</option>
          </select>
          <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {reportType === 'sales' ? renderSalesReport() : renderInventoryReport()}
    </div>
  );
}

export default Reports;
