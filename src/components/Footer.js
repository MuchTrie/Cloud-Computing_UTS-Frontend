import React from 'react';
import '../styles/footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>ShopNow</h3>
          <p>Your one-stop destination for all your shopping needs. Quality products, competitive prices, and exceptional customer service.</p>
          <div className="social-icons">
            <a href="#" className="social-icon">📱</a>
            <a href="#" className="social-icon">📘</a>
            <a href="#" className="social-icon">📸</a>
            <a href="#" className="social-icon">🐦</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li><a href="#">Electronics</a></li>
            <li><a href="#">Clothing</a></li>
            <li><a href="#">Home & Garden</a></li>
            <li><a href="#">Sports & Outdoors</a></li>
            <li><a href="#">Toys & Games</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@much-shop.com</p>
          <p>Phone: +62 78173726431</p>
          <p>Address: Cibaduyut</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Subscribe to our newsletter" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MUCH - SHOP</p>
        <p>All rights reserved</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Shipping Policy</a>
          <a href="#">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
