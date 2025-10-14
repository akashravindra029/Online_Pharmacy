import React, { useState, useEffect } from 'react';
import '../styles/RevenueAnalytics.css';

function RevenueAnalytics() {
  const [orders, setOrders] = useState([]);
  const [dailyRevenue, setDailyRevenue] = useState({});
  const [monthlyRevenue, setMonthlyRevenue] = useState({});

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      const parsedOrders = JSON.parse(storedOrders);
      setOrders(parsedOrders);
      calculateRevenue(parsedOrders);
    }
  }, []);

  const calculateRevenue = (orderData) => {
    const daily = {};
    const monthly = {};

    orderData.forEach(order => {
      if (!order.date) return; // Skip orders without date
      const date = new Date(order.date);
      if (isNaN(date.getTime())) return; // Skip invalid dates

      const dayKey = date.toISOString().split('T')[0];
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

      const total = order.items ? order.items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0) : 0;

      daily[dayKey] = (daily[dayKey] || 0) + total;
      monthly[monthKey] = (monthly[monthKey] || 0) + total;
    });

    setDailyRevenue(daily);
    setMonthlyRevenue(monthly);
  };

  const getTotalRevenue = () => {
    return Object.values(dailyRevenue).reduce((sum, rev) => sum + (parseFloat(rev) || 0), 0);
  };

  const getTodayRevenue = () => {
    const today = new Date().toISOString().split('T')[0];
    return dailyRevenue[today] || 0;
  };

  const getThisMonthRevenue = () => {
    const thisMonth = new Date().toISOString().slice(0, 7);
    return monthlyRevenue[thisMonth] || 0;
  };

  return (
    <div className="revenue-analytics">
      <h2>Revenue Analytics</h2>

      <div className="revenue-summary">
        <div className="summary-card">
          <h3>Total Revenue</h3>
          <p className="revenue-amount">₹{getTotalRevenue().toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>Today's Revenue</h3>
          <p className="revenue-amount">₹{getTodayRevenue().toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>This Month's Revenue</h3>
          <p className="revenue-amount">₹{getThisMonthRevenue().toFixed(2)}</p>
        </div>
        <div className="summary-card">
          <h3>Total Orders</h3>
          <p className="revenue-amount">{orders.length}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-section">
          <h3>Daily Revenue</h3>
          <div className="revenue-list">
            {Object.entries(dailyRevenue)
              .sort(([a], [b]) => b.localeCompare(a))
              .slice(0, 30)
              .map(([date, revenue]) => (
                <div key={date} className="revenue-item">
                  <span className="date">{date}</span>
                  <span className="amount">₹{revenue.toFixed(2)}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="chart-section">
          <h3>Monthly Revenue</h3>
          <div className="revenue-list">
            {Object.entries(monthlyRevenue)
              .sort(([a], [b]) => b.localeCompare(a))
              .map(([month, revenue]) => (
                <div key={month} className="revenue-item">
                  <span className="date">{month}</span>
                  <span className="amount">₹{revenue.toFixed(2)}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div className="recent-orders">
        <h3>Recent Orders</h3>
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(-10).reverse().map((order, index) => (
                <tr key={index}>
                  <td>{order.id || `Order-${index + 1}`}</td>
                  <td>{order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}</td>
                  <td>{order.items ? order.items.length : 0} items</td>
                  <td>₹{order.items ? order.items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0).toFixed(2) : '0.00'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RevenueAnalytics;
