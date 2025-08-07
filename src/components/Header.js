import React, { useState } from 'react';
import '../styles/header.css';

function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality would be implemented here
    console.log('Searching for:', searchTerm);
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-top">
          <div className="logo-container">
            <h1>MUCH - SHOP</h1>
          </div>
          
          <form className="search-container" onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search for products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              Search
            </button>
          </form>
          
          <div className="header-actions">
            <div className="action-icon cart-icon">
              <span className="icon">🛒</span>
              <span className="cart-count">0</span>
            </div>
            <div className="action-icon">
              <span className="icon">👤</span>
            </div>
          </div>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li className="active"><a href="#">Home</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">New Arrivals</a></li>
            <li><a href="#">Best Sellers</a></li>
            <li><a href="#">Deals</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
