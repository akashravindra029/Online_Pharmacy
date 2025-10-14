import React, { useState, useEffect } from 'react';
import '../styles/CustomerManagement.css';

function CustomerManagement() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      const storedOrders = localStorage.getItem('orders');
      if (storedOrders) {
        const orders = JSON.parse(storedOrders);
        const customerMap = {};

        orders.forEach(order => {
          const customerId = order.customerEmail || order.customerName;
          if (!customerMap[customerId]) {
            customerMap[customerId] = {
              id: customerId,
              name: order.customerName || 'N/A',
              email: order.customerEmail || 'N/A',
              phone: order.customerPhone || 'N/A',
              totalOrders: 0,
              totalSpent: 0,
              lastOrder: order.date,
              orders: []
            };
          }

          customerMap[customerId].totalOrders += 1;
          customerMap[customerId].totalSpent += parseFloat(order.total) || 0;
          customerMap[customerId].orders.push(order);

          if (new Date(order.date) > new Date(customerMap[customerId].lastOrder)) {
            customerMap[customerId].lastOrder = order.date;
          }
        });

        const customerList = Object.values(customerMap);
        setCustomers(customerList);
      }
    } catch (error) {
      console.error('Error parsing orders from localStorage:', error);
      setCustomers([]);
    }
  }, []);

  const filteredCustomers = customers
    .filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'orders':
          return b.totalOrders - a.totalOrders;
        case 'spent':
          return b.totalSpent - a.totalSpent;
        case 'lastOrder':
          return new Date(b.lastOrder) - new Date(a.lastOrder);
        default:
          return 0;
      }
    });

  const getCustomerStats = () => {
    const totalCustomers = customers.length;
    const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
    const avgOrderValue = totalRevenue / customers.reduce((sum, customer) => sum + customer.totalOrders, 0) || 0;

    return {
      totalCustomers,
      totalRevenue,
      avgOrderValue
    };
  };

  const stats = getCustomerStats();

  return (
    <div className="customer-management">
      <div className="header">
        <h2>Customer Management</h2>
        <div className="stats">
          <div className="stat-card">
            <span className="stat-label">Total Customers</span>
            <span className="stat-value">{stats.totalCustomers}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Revenue</span>
            <span className="stat-value">₹{stats.totalRevenue.toFixed(2)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Avg Order Value</span>
            <span className="stat-value">₹{stats.avgOrderValue.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Sort by Name</option>
          <option value="orders">Sort by Orders</option>
          <option value="spent">Sort by Total Spent</option>
          <option value="lastOrder">Sort by Last Order</option>
        </select>
      </div>

      <div className="customers-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Total Orders</th>
              <th>Total Spent</th>
              <th>Last Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.totalOrders}</td>
                <td>₹{customer.totalSpent.toFixed(2)}</td>
                <td>{new Date(customer.lastOrder).toLocaleDateString()}</td>
                <td>
                  <button
                    className="view-orders-btn"
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setShowModal(true);
                    }}
                  >
                    View Orders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCustomers.length === 0 && (
        <div className="no-customers">
          <p>No customers found matching your criteria.</p>
        </div>
      )}

      {showModal && selectedCustomer && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order History for {selectedCustomer.name}</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="customer-info">
                <p><strong>Email:</strong> {selectedCustomer.email}</p>
                <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                <p><strong>Total Orders:</strong> {selectedCustomer.totalOrders}</p>
                <p><strong>Total Spent:</strong> ₹{selectedCustomer.totalSpent.toFixed(2)}</p>
              </div>
              <div className="orders-list">
                <h4>Orders:</h4>
                {selectedCustomer.orders.map((order, index) => (
                  <div key={index} className="order-item">
                    <div className="order-header">
                      <span><strong>Order ID:</strong> {order.id || `Order ${index + 1}`}</span>
                      <span><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</span>
                      <span><strong>Total:</strong> ₹{parseFloat(order.total).toFixed(2)}</span>
                    </div>
                    <div className="order-items">
                      {order.items && order.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="order-item-detail">
                          <span>{item.name} (x{item.quantity})</span>
                          <span>₹{parseFloat(item.price).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerManagement;
