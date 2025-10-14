import React, { useState, useEffect } from 'react';
import '../styles/ProductManagement.css';

function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    brand: '',
    strength: '',
    packSize: '',
    category: 'Medicines',
    stock: 0
  });

  const categories = ["Medicines", "Health & Nutrition", "Personal Care", "Baby Care"];

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      // Initialize with default products
      const defaultProducts = [
        {
          name: "Paracetamol", price: 5.99, description: "Pain reliever and fever reducer", brand: "Generic", strength: "500mg", packSize: "10 tablets", category: "Medicines", stock: 100
        },
        { name: "Ibuprofen", price: 7.49, description: "Anti-inflammatory pain reliever", brand: "Advil", strength: "200mg", packSize: "20 tablets", category: "Medicines", stock: 80 },
        { name: "Aspirin", price: 4.99, description: "Pain reliever and blood thinner", brand: "Bayer", strength: "81mg", packSize: "30 tablets", category: "Medicines", stock: 120 },
        { name: "Amoxicillin", price: 12.99, description: "Antibiotic for bacterial infections", brand: "Generic", strength: "500mg", packSize: "21 capsules", category: "Medicines", stock: 50 },
        { name: "Cetirizine", price: 6.49, description: "Antihistamine for allergies", brand: "Zyrtec", strength: "10mg", packSize: "30 tablets", category: "Medicines", stock: 90 },
        { name: "Vitamin C", price: 9.99, description: "Immune system support", brand: "Nature Made", strength: "1000mg", packSize: "60 tablets", category: "Health & Nutrition", stock: 70 },
        { name: "Multivitamin", price: 12.99, description: "Daily vitamin supplement", brand: "Centrum", strength: "Adult", packSize: "100 tablets", category: "Health & Nutrition", stock: 60 },
        { name: "Omega-3", price: 14.99, description: "Heart health supplement", brand: "Fish Oil", strength: "1000mg", packSize: "120 softgels", category: "Health & Nutrition", stock: 40 },
        { name: "Calcium + Vitamin D", price: 11.49, description: "Bone health support", brand: "Generic", strength: "500mg/400IU", packSize: "90 tablets", category: "Health & Nutrition", stock: 85 },
        { name: "Probiotics", price: 16.99, description: "Gut health supplement", brand: "Culturelle", strength: "10 billion CFU", packSize: "30 capsules", category: "Health & Nutrition", stock: 35 },
        { name: "Shampoo", price: 8.99, description: "Hair cleansing product", brand: "Head & Shoulders", strength: "Anti-dandruff", packSize: "400ml", category: "Personal Care", stock: 110 },
        { name: "Moisturizer", price: 11.49, description: "Skin hydration cream", brand: "Cetaphil", strength: "Daily", packSize: "453g", category: "Personal Care", stock: 75 },
        { name: "Toothpaste", price: 3.99, description: "Oral hygiene product", brand: "Colgate", strength: "Total", packSize: "100g", category: "Personal Care", stock: 150 },
        { name: "Face Wash", price: 7.99, description: "Gentle facial cleanser", brand: "CeraVe", strength: "Hydrating", packSize: "236ml", category: "Personal Care", stock: 95 },
        { name: "Sunscreen", price: 13.99, description: "UV protection lotion", brand: "Neutrogena", strength: "SPF 50", packSize: "88ml", category: "Personal Care", stock: 65 },
        { name: "Diapers", price: 19.99, description: "Absorbent baby diapers", brand: "Pampers", strength: "Size 4", packSize: "44 count", category: "Baby Care", stock: 55 },
        { name: "Baby Lotion", price: 6.99, description: "Gentle baby skin care", brand: "Johnson's", strength: "Original", packSize: "200ml", category: "Baby Care", stock: 80 },
        { name: "Baby Formula", price: 24.99, description: "Infant nutrition", brand: "Similac", strength: "Stage 1", packSize: "1.45kg", category: "Baby Care", stock: 30 },
        { name: "Baby Wipes", price: 4.49, description: "Gentle baby cleansing wipes", brand: "Huggies", strength: "Unscented", packSize: "64 count", category: "Baby Care", stock: 120 },
        { name: "Baby Shampoo", price: 5.99, description: "Tear-free baby shampoo", brand: "Johnson's", strength: "Original", packSize: "200ml", category: "Baby Care", stock: 90 }
      ];
      setProducts(defaultProducts);
      localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
  }, []);

  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = () => {
    const newProduct = { ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) };
    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
    setFormData({
      name: '',
      price: '',
      description: '',
      brand: '',
      strength: '',
      packSize: '',
      category: 'Medicines',
      stock: 0
    });
    setShowAddForm(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData(product);
  };

  const handleUpdateProduct = () => {
    const updatedProducts = products.map(p =>
      p.name === editingProduct.name ? { ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) } : p
    );
    saveProducts(updatedProducts);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      description: '',
      brand: '',
      strength: '',
      packSize: '',
      category: 'Medicines',
      stock: 0
    });
  };

  const handleDeleteProduct = (productName) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.name !== productName);
      saveProducts(updatedProducts);
    }
  };

  const exportProducts = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'products.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importProducts = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedProducts = JSON.parse(e.target.result);
          saveProducts(importedProducts);
          alert('Products imported successfully!');
        } catch (error) {
          alert('Error importing products. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="product-management">
      <div className="header">
        <h2>Product Management</h2>
        <div className="actions">
          <button onClick={() => setShowAddForm(true)} className="add-btn">Add Product</button>
          <button onClick={exportProducts} className="export-btn">Export Products</button>
          <label className="import-btn">
            Import Products
            <input type="file" accept=".json" onChange={importProducts} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {showAddForm && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add New Product</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
              <input name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
              <input name="price" type="number" step="0.01" placeholder="Price" value={formData.price} onChange={handleInputChange} required />
              <input name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
              <input name="brand" placeholder="Brand" value={formData.brand} onChange={handleInputChange} required />
              <input name="strength" placeholder="Strength" value={formData.strength} onChange={handleInputChange} />
              <input name="packSize" placeholder="Pack Size" value={formData.packSize} onChange={handleInputChange} />
              <select name="category" value={formData.category} onChange={handleInputChange}>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <input name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleInputChange} required />
              <div className="modal-actions">
                <button type="submit">Add Product</button>
                <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingProduct && (
        <div className="modal">
          <div className="modal-content">
            <h3>Edit Product</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdateProduct(); }}>
              <input name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} required />
              <input name="price" type="number" step="0.01" placeholder="Price" value={formData.price} onChange={handleInputChange} required />
              <input name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required />
              <input name="brand" placeholder="Brand" value={formData.brand} onChange={handleInputChange} required />
              <input name="strength" placeholder="Strength" value={formData.strength} onChange={handleInputChange} />
              <input name="packSize" placeholder="Pack Size" value={formData.packSize} onChange={handleInputChange} />
              <select name="category" value={formData.category} onChange={handleInputChange}>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <input name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleInputChange} required />
              <div className="modal-actions">
                <button type="submit">Update Product</button>
                <button type="button" onClick={() => setEditingProduct(null)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>₹{product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => handleEditProduct(product)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDeleteProduct(product.name)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductManagement;
