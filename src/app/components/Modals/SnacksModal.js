"use client";
import React, { useState } from "react";
import Modals from "./Modals";
import ShippingMethod from "../ShippingMethod/ShippingMethod";

export default function SnacksModal({ isOpen, onClose, product }) {
  if (!isOpen) return null;

  const initialItems = [
    { name: "Chocolate Snack", price: 6000, quantity: 0 },
    { name: "Fruit Snack", price: 7000, quantity: 0 },
    { name: "Nut Snack", price: 5000, quantity: 0 },
    { name: "Cookie Snack", price: 4500, quantity: 0 },
    { name: "Candy Snack", price: 3500, quantity: 0 },
    { name: "Cheese Snack", price: 5500, quantity: 0 },
    { name: "Granola Snack", price: 6500, quantity: 0 },
    { name: "Rice Snack", price: 4000, quantity: 0 },
    { name: "Fruit Bar", price: 3000, quantity: 0 },
    { name: "Protein Snack", price: 8000, quantity: 0 },
  ];

  const [items, setItems] = useState(initialItems);
  const [shipping, setShipping] = useState("pickup");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [shippingDate, setShippingDate] = useState("");
  
  

  const increaseQty = (index) => {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };
  const decreaseQty = (index) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const itemsTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = shipping === "home" ? 3000 : 0;
  const totalPrice = 10000 + itemsTotal + shippingPrice;

  const minOrder = 18000;
  const canCheckout = itemsTotal >= minOrder;

  const whatsappLink = `https://wa.me/+821043942212?text=Hello, I want to order ${product.title}. Items: ${items
    .map((i) => `${i.name} x${i.quantity}`)
    .join(", ")}. Shipping: ${
    shipping === "pickup" ? "pickup" : "send to home, address: " + address
  }. Total price: ${totalPrice.toLocaleString()} won`;

  return (
    <Modals isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          padding: "0",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Helvetica Neue', sans-serif",
          color: "#333",
          maxHeight: "90vh", // limit modal height
          overflow: "hidden", // prevent content spilling
          borderRadius: "1rem",
        }}
      >
        <div>
          <div 
            style={{ 
              fontWeight: "bold",
              gap:".4rem",
              display:"flex" 
            }}
            >
            Basic Bouquete 
            <span
              style={{
                fontSize:".85rem"
              }}
            >  
              (10.000 won)
            </span>
          </div>

          <div
            style={{
              fontStyle:"italic"
            }}
          >
            *snacks and gift card included
          </div>
        </div>
        {/* Scrollable Content */}
        <div
          style={{
            padding: "1.5rem",
            overflowY: "auto",
            flex: "1 1 auto",
          }}
        >
          {/* Product Image & Title */}
          <div
            style={{
              display:'flex',
              justifyContent:"center"
            }}
          >

            <img
              src={product.images[0]}
              alt={product.title}
              style={{
                width:"100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "1rem",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              }}
            />
          </div>
          <h2 style={{ marginTop: "1rem", fontWeight: "600", textAlign: "center" }}>{product.title}</h2>

          {/* Items List Scrollable */}
          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              maxHeight: "200px",
              overflowY: "auto",
              paddingRight: "0.25rem",
            }}
          >
            
            {items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  background: "#f9f9f9",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <div>
                  <div style={{ fontWeight: "500" }}>{item.name}</div>
                  <div style={{ fontSize: "0.85rem", color: "#555" }}>{item.price.toLocaleString()} won</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <button
                    onClick={() => decreaseQty(idx)}
                    style={{
                      padding: "0.25rem 0.5rem",
                      border: "1px solid #ccc",
                      borderRadius: "0.25rem",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(idx)}
                    style={{
                      padding: "0.25rem 0.5rem",
                      border: "1px solid #ccc",
                      borderRadius: "0.25rem",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total & Minimum Order Info */}
          <div style={{ marginTop: "1rem", textAlign: "center" }}>
            <h3>Total: {totalPrice.toLocaleString()} won</h3>
            {!canCheckout && (
              <p style={{ color: "#ff4d4f", fontWeight: "500", fontSize: "0.9rem" }}>
                Minimum items order: {minOrder.toLocaleString()} won (shipping not included)
              </p>
            )}
          </div>

          {/* Shipping Section */}
          <ShippingMethod
                  detailAddress={detailAddress}
                  setDetailAddress={setDetailAddress}
                  shipping={shipping}
                  setShipping={setShipping}
                  shippingDate={shippingDate}
                  setShippingDate={setShippingDate}
                  address={address}
                  setAddress={setAddress}
          />
        </div>

        {/* Checkout Button */}
        <a
          href={canCheckout ? whatsappLink : "#"}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            margin: "1rem 1.5rem 1.5rem",
            padding: "0.75rem",
            background: canCheckout ? "linear-gradient(135deg, #25D366, #128C7E)" : "#ccc",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "0.5rem",
            textDecoration: "none",
            textAlign: "center",
            cursor: canCheckout ? "pointer" : "not-allowed",
            transition: "all 0.3s ease",
          }}
        >
          Checkout via WhatsApp
        </a>
      </div>
    </Modals>
  );
}
