"use client";
import React from "react";

export default function MenuItem({ item }) {
  // Generate chili icons for spice level
  const spiceIcons = Array.from({ length: item.spicy_level || 0 }).map((_, i) => (
    <span key={i}>🌶️</span>
  ));

  return (
    <div className="menu-item-card">
      <div className="item-image-wrapper">
        <img 
          src={item.image} 
          alt={item.name} 
          className="item-image" 
          loading="lazy" 
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop if fallback also fails
            e.target.src = `https://placehold.co/400x300/f1f5f9/64748b?text=${encodeURIComponent(item.name)}`;
          }}
        />
        
        <div className="badges-container">
          {item.original_price && <span className="badge sale">On Sale</span>}
          {item.is_popular && <span className="badge popular">Popular</span>}
          {item.is_sold_out && <span className="badge sold-out">Sold Out</span>}
          {item.is_halal && <span className="badge">Halal</span>}
        </div>
      </div>

      <div className="item-content">
        <div className="item-header">
          <h3 className="item-name">{item.name}</h3>
          <div className="price-container" style={{ textAlign: 'right' }}>
            {item.original_price && (
              <span className="item-original-price" style={{
                textDecoration: 'line-through',
                color: '#999',
                fontSize: '0.85rem',
                marginRight: '0.5rem'
              }}>{item.original_price}</span>
            )}
            <span className="item-price">{item.price}</span>
          </div>
        </div>
        
        <p className="item-description">{item.description}</p>
        
        <div className="item-meta">
          {item.portion_size && (
            <span className="portion"><strong>Portion:</strong> {item.portion_size}</span>
          )}
          
          {item.spicy_level > 0 && (
            <span className="spice-level" title={`Spicy Level: ${item.spicy_level}`}>
              {spiceIcons}
            </span>
          )}

          {item.dietary_tags && item.dietary_tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
