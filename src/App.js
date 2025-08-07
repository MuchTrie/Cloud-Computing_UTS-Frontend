import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductForm from './components/ProductForm';
import AnimatedBackground from './components/AnimatedBackground';
import axios from 'axios';
import './styles/app.css';
import './styles/effects.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Set the backend URL to your actual backend
      const response = await axios.get('http://localhost:3000/api/products');
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        setError('Failed to load products');
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Error connecting to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const handleAddProduct = async (formData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        // Refresh the product list
        fetchProducts();
        // Close the modal
        setIsModalOpen(false);
      } else {
        alert('Failed to create product');
      }
    } catch (err) {
      console.error('Error adding product:', err);
      alert('Error adding product. Please try again.');
    }
  };

  return (
    <div className="app-container">
      <AnimatedBackground />
      <Header />
      <main className="main-content">
        {/* Hero Banner */}
        <div className="hero-banner">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Welcome to Our Store</h1>
            <p>Quality products for every need, delivered with excellence. Discover our premium collection of innovative gadgets and must-have accessories.</p>
            <button className="shop-now-btn">Shop Now</button>
          </div>
        </div>
        
        {/* Category Navigation */}
        <div className="category-nav">
          <div className="category-item glass-effect gradient-border">
            <div className="category-icon">📱</div>
            <span>Electronics</span>
          </div>
          <div className="category-item glass-effect gradient-border">
            <div className="category-icon">👕</div>
            <span>Fashion</span>
          </div>
          <div className="category-item glass-effect gradient-border">
            <div className="category-icon">🏠</div>
            <span>Home</span>
          </div>
          <div className="category-item glass-effect gradient-border">
            <div className="category-icon">🎮</div>
            <span>Gaming</span>
          </div>
          <div className="category-item glass-effect gradient-border">
            <div className="category-icon">🎁</div>
            <span>Gifts</span>
          </div>
        </div>
        
        {/* Product Display */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        ) : (
          <>
            <div className="featured-section glass-effect gradient-border">
              <h2 className="glowing-text">Featured Products</h2>
              <p>Our handpicked selection just for you</p>
            </div>
            <ProductList products={products} />
          </>
        )}
        
        {/* Promotional Banner */}
        <div className="promo-banner">
          <div className="promo-waves"></div>
          <div className="promo-content glass-effect">
            <h2>Free Shipping on Orders Over Rp500.000</h2>
            <p>Use code: <span className="promo-code">FREESHIP</span> at checkout</p>
            <button>View Details</button>
          </div>
        </div>
        
        {/* Admin Panel - Moved to Bottom */}
        <div className="admin-panel glass-effect">
          <h3></h3>
          <div className="action-buttons">
            <button className="add-product-btn" onClick={() => setIsModalOpen(true)}>
              + Tambah Produk Baru
            </button>
          </div>
        </div>
        
        {/* Add Product Modal */}
        {isModalOpen && (
          <ProductForm 
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleAddProduct}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
