import React from 'react';
import ProductCard from './ProductCard';
import '../styles/productList.css';

function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <div className="empty-products">
        <h2>No products available</h2>
        <p>There are currently no products to display.</p>
      </div>
    );
  }
  
  // Show all products in a single section
  return (
    <div className="product-list-container">
      <section className="product-section">
        <div className="section-header">
          <h2>Our Products</h2>
          <div className="view-all">
            <a href="#">View All <span className="arrow">→</span></a>
          </div>
        </div>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      <div className="pagination">
        <button className="pagination-btn active">1</button>
        <button className="pagination-btn">2</button>
        <button className="pagination-btn">3</button>
        <button className="pagination-btn next">Next →</button>
      </div>
    </div>
  );
}

export default ProductList;
