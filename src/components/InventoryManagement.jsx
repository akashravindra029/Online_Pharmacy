import React, { useState, useEffect } from 'react';
import '../styles/InventoryManagement.css';

function InventoryManagement() {
  const [products, setProducts] = useState([]);
  const [lowStockThreshold, setLowStockThreshold] = useState(20);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const updateStock = (productName, newStock) => {
    const updatedProducts = products.map(p =>
      p.name === productName ? { ...p, stock: parseInt(newStock) } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const lowStockProducts = products.filter(p => p.stock <= lowStockThreshold);

  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  return (
    <div className="inventory-management">
      <div className="header">
        <h2>Inventory Management</h2>
        <div className="summary">
          <div className="summary-item">
            <span className="label">Total Products:</span>
            <span className="value">{products.length}</span>
          </div>
          <div className="summary-item">
            <span className="label">Total Value:</span>
            <span className="value">₹{totalValue.toFixed(2)}</span>
          </div>
          <div className="summary-item">
            <span className="label">Low Stock Items:</span>
            <span className="value">{lowStockProducts.length}</span>
          </div>
        </div>
      </div>

      <div className="threshold-setting">
        <label>Low Stock Threshold: </label>
        <input
          type="number"
          value={lowStockThreshold}
          onChange={(e) => setLowStockThreshold(parseInt(e.target.value))}
          min="0"
        />
      </div>

      {lowStockProducts.length > 0 && (
        <div className="low-stock-alert">
          <h3>Low Stock Alert</h3>
          <ul>
            {lowStockProducts.map((product, index) => (
              <li key={index}>
                {product.name} - Current Stock: {product.stock}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="inventory-table">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Price</th>
              <th>Value</th>
              <th>Update Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className={product.stock <= lowStockThreshold ? 'low-stock' : ''}>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>₹{product.price.toFixed(2)}</td>
                <td>₹{(product.price * product.stock).toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    value={product.stock}
                    onChange={(e) => updateStock(product.name, e.target.value)}
                    className="stock-input"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventoryManagement;
