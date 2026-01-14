import React, { useState, useEffect } from 'react';

function ProductCard({ title = 'Product Name', price = '15.000', images = [] ,onClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play effect
  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500); // change image every 2.5 seconds
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '200px',
        minWidth: '120px',
        border: '1px solid #ccc',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        fontFamily: 'sans-serif',
        margin: '0.5rem',
        flexShrink: 0,
        backgroundColor:"white"
      }}
    >
      {/* Image Carousel */}
      <div
        style={{
          width: '100%',
          paddingTop: '60%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#eee',
        }}
      >
        {images.length > 0 ? (
          <img
            src={images[currentIndex]}
            alt={title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition:"center",
              transition: 'opacity 0.5s ease-in-out',
            }}
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.9rem',
              color: '#999',
            }}
          >
            Image Placeholder
          </div>
        )}
      </div>

      {/* Product Info */}
      <div style={{ padding: '0.5rem' }}>
        <h3
          style={{
            margin: '0 0 0.3rem 0',
            fontSize: '1rem',
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {title}
        </h3>
        <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>
          Starts from {price} won
        </p>
        <button
          style={{
            marginTop: '0.4rem',
            padding: '0.4rem',
            fontSize: '0.9rem',
            borderRadius: '0.25rem',
            border: 'none',
            backgroundColor: '#ff7f50',
            color: '#fff',
            cursor: 'pointer',
            width: '100%',
          }}
          onClick={onClick}
        >
          Choose
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
