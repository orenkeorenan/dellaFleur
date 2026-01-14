"use client"

import React, { useState } from 'react';
import Modals from './Modals';

export default function ChooseModals({ isOpen, onClose, product }) {
  if (!product) return null;

  const basePrice = Number(product?.price.replace(/\./g, '')) || 15000; // convert "15.000" to 15000
  const maxFreeItems = 5;
  const extraPricePerItem = 2000;

  // Initialize 5 items
  const [items, setItems] = useState([
    { name: `${product.title} Item 1`, quantity: 0 },
    { name: `${product.title} Item 2`, quantity: 0 },
    { name: `${product.title} Item 3`, quantity: 0 },
    { name: `${product.title} Item 4`, quantity: 0 },
    { name: `${product.title} Item 5`, quantity: 0 },
  ]);

  const increaseQuantity = (index) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (index) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  // Calculate totals
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const extraItems = Math.max(0, totalItems - maxFreeItems);
  const totalPrice = basePrice + extraItems * extraPricePerItem;

  return (
    <Modals isOpen={isOpen} onClose={onClose}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem' }}>
        
        {/* Product image */}
        {product.images && product.images.length > 0 && (
          <img
            src={product.images[0]}
            alt={product.title}
            style={{ width: '200px', height: '200px', objectFit:'contain', borderRadius:'0.5rem' }}
          />
        )}

        {/* Title & Price info */}
        <h2 style={{ margin:0, fontSize:'1.25rem', fontWeight:'bold' }}>{product.title}</h2>
        <p style={{ margin:0, fontSize:'1rem', color:'#555' }}>
          Base Price: {product.price} won
        </p>
        <p style={{ margin:0, fontSize:'0.9rem', color:'#888', textAlign:'center' }}>
          You can pick up to {maxFreeItems} items at base price.
          Additional items cost +{extraPricePerItem.toLocaleString()} won each.
        </p>

        {/* Invoice List */}
        <div style={{ width:'100%', marginTop:'1rem' }}>
          <h3 style={{ marginBottom:'0.5rem' }}>Invoice</h3>
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center',
                marginBottom:'0.5rem'
              }}
            >
              <span>{item.name}</span>
              <div style={{ display:'flex', alignItems:'center', gap:'0.25rem' }}>
                <button
                  onClick={() => decreaseQuantity(idx)}
                  style={{ padding:'0.25rem 0.5rem', border:'1px solid #ccc', borderRadius:'0.25rem' }}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(idx)}
                  style={{ padding:'0.25rem 0.5rem', border:'1px solid #ccc', borderRadius:'0.25rem' }}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total Price */}
        <h3>Total: {totalPrice.toLocaleString()} won</h3>

        {/* Confirm Button */}
        <button
          onClick={onClose}
          style={{
            marginTop:'1rem',
            padding:'0.5rem 1rem',
            border:'none',
            borderRadius:'0.25rem',
            backgroundColor:'#ff7f50',
            color:'#fff',
            cursor:'pointer'
          }}
        >
          Confirm
        </button>
      </div>
    </Modals>
  );
}
