
import React, { useState, useMemo } from 'react';
import { useCart } from '../contexts/CartContext';
import '../styles/Medicines.css';

function Medicines() {
  const { addToCart } = useCart();

  const allMedicines = useMemo(() => [
    {
      name: "Paracetamol", price: 5.99, description: "Pain reliever and fever reducer", brand: "Generic", strength: "500mg", packSize: "10 tablets", category: "Medicines"
    },
    { name: "Ibuprofen", price: 7.49, description: "Anti-inflammatory pain reliever", brand: "Advil", strength: "200mg", packSize: "20 tablets", category: "Medicines" },
    { name: "Aspirin", price: 4.99, description: "Pain reliever and blood thinner", brand: "Bayer", strength: "81mg", packSize: "30 tablets", category: "Medicines" },
    { name: "Amoxicillin", price: 12.99, description: "Antibiotic for bacterial infections", brand: "Generic", strength: "500mg", packSize: "21 capsules", category: "Medicines" },
    { name: "Cetirizine", price: 6.49, description: "Antihistamine for allergies", brand: "Zyrtec", strength: "10mg", packSize: "30 tablets", category: "Medicines" },
    { name: "Vitamin C", price: 9.99, description: "Immune system support", brand: "Nature Made", strength: "1000mg", packSize: "60 tablets", category: "Health & Nutrition" },
    { name: "Multivitamin", price: 12.99, description: "Daily vitamin supplement", brand: "Centrum", strength: "Adult", packSize: "100 tablets", category: "Health & Nutrition" },
    { name: "Omega-3", price: 14.99, description: "Heart health supplement", brand: "Fish Oil", strength: "1000mg", packSize: "120 softgels", category: "Health & Nutrition" },
    { name: "Calcium + Vitamin D", price: 11.49, description: "Bone health support", brand: "Generic", strength: "500mg/400IU", packSize: "90 tablets", category: "Health & Nutrition" },
    { name: "Probiotics", price: 16.99, description: "Gut health supplement", brand: "Culturelle", strength: "10 billion CFU", packSize: "30 capsules", category: "Health & Nutrition" },
    { name: "Shampoo", price: 8.99, description: "Hair cleansing product", brand: "Head & Shoulders", strength: "Anti-dandruff", packSize: "400ml", category: "Personal Care" },
    { name: "Moisturizer", price: 11.49, description: "Skin hydration cream", brand: "Cetaphil", strength: "Daily", packSize: "453g", category: "Personal Care" },
    { name: "Toothpaste", price: 3.99, description: "Oral hygiene product", brand: "Colgate", strength: "Total", packSize: "100g", category: "Personal Care" },
    { name: "Face Wash", price: 7.99, description: "Gentle facial cleanser", brand: "CeraVe", strength: "Hydrating", packSize: "236ml", category: "Personal Care" },
    { name: "Sunscreen", price: 13.99, description: "UV protection lotion", brand: "Neutrogena", strength: "SPF 50", packSize: "88ml", category: "Personal Care" },
    { name: "Diapers", price: 19.99, description: "Absorbent baby diapers", brand: "Pampers", strength: "Size 4", packSize: "44 count", category: "Baby Care" },
    { name: "Baby Lotion", price: 6.99, description: "Gentle baby skin care", brand: "Johnson's", strength: "Original", packSize: "200ml", category: "Baby Care" },
    { name: "Baby Formula", price: 24.99, description: "Infant nutrition", brand: "Similac", strength: "Stage 1", packSize: "1.45kg", category: "Baby Care" },
    { name: "Baby Wipes", price: 4.49, description: "Gentle baby cleansing wipes", brand: "Huggies", strength: "Unscented", packSize: "64 count", category: "Baby Care" },
    { name: "Baby Shampoo", price: 5.99, description: "Tear-free baby shampoo", brand: "Johnson's", strength: "Original", packSize: "200ml", category: "Baby Care" }
  ], []);

  const categories = ["Medicines", "Health & Nutrition", "Personal Care", "Baby Care"];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Medicines");
  const [sortOption, setSortOption] = useState("name-asc");

  const filteredAndSortedMedicines = useMemo(() => {
    let filtered = allMedicines.filter(medicine => {
      const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            medicine.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            medicine.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = medicine.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      return 0;
    });

    return filtered;
  }, [allMedicines, searchTerm, selectedCategory, sortOption]);

  return (
    <div className="medicines-page">
      <h1>Medicines</h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="filter-select">
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="filter-select">
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="price-asc">Price Low-High</option>
          <option value="price-desc">Price High-Low</option>
        </select>
      </div>
      <div className="medicines-grid">
        {filteredAndSortedMedicines.map((medicine, index) => (
          <div key={index} className="medicine-card">
            <div className="medicine-header">
              <h3>{medicine.name}</h3>
              <span className="brand">{medicine.brand}</span>
            </div>
            <p className="description">{medicine.description}</p>
            <div className="medicine-details">
              <span className="detail">Strength: {medicine.strength}</span>
              <span className="detail">Pack Size: {medicine.packSize}</span>
            </div>
            <div className="medicine-footer">
              <span className="price">${medicine.price.toFixed(2)}</span>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(medicine)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {filteredAndSortedMedicines.length === 0 && <p className="no-results">No medicines found matching your criteria.</p>}
    </div>
  );
}

export default Medicines;
