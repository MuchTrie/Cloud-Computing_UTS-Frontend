import React, { useState } from 'react';
import '../styles/productCard.css';
import ReactDOM from 'react-dom';

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Generate random rating between 3.5 and 5
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
  const ratingStars = parseFloat(rating);
  
  // Format price to IDR currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  // Handle add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    alert(`Added ${product.name} to cart!`);
  };
  
  // Handle product click
  const handleProductClick = () => {
    // In a real app, this would navigate to the product detail page
    console.log('View product details:', product.id);
  };
  
  // Handle quick view button click
  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal(true);
  };
  
  // Generate star rating display
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star full">★</span>);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">★</span>);
    }
    
    return stars;
  };

  return (
    <div 
      className="product-card glass-effect dynamic-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
    >
      <div className="product-badge">New</div>
      
      <div className="product-image-container">
        <img 
          src={product.s3_image_url} 
          alt={product.name} 
          className="product-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        {isHovered && (
          <div className="quick-actions">
            <button className="quick-view-btn" onClick={handleQuickView}>Quick View</button>
          </div>
        )}
      </div>
      
      <div className="product-details">
        <div className="product-rating">
          {renderStars(ratingStars)}
          <span className="rating-count">({Math.floor(Math.random() * 50) + 5})</span>
        </div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <div className="product-price">{formatPrice(product.price)}</div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      
      {/* Portal untuk Modal agar tidak terbatas dalam card */}
      {showModal && ReactDOM.createPortal(
        <div className="product-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="product-modal" onClick={(e) => e.stopPropagation()}>
            <div className="product-modal-header">
              <h3>{product.name}</h3>
              <button className="modal-close-btn" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="product-modal-body">
              <div className="product-modal-content">
                <div className="product-modal-image-container">
                  <img 
                    src={product.s3_image_url} 
                    alt={product.name} 
                    className="product-modal-image"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                    }}
                  />
                </div>
                <div className="product-modal-description">
                  <h4>Deskripsi</h4>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default ProductCard;
