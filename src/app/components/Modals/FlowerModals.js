"use client";
import React, { useState } from "react";
import Modals from "./Modals";
import ShippingMethod from "../ShippingMethod/ShippingMethod";

export default function FlowerModal({ isOpen, onClose, product }) {
  // Mood colors with friendly names
  const moodColors = [
    { hex: "#040102", name: "Black" },
    { hex: "#F7ECBE", name: "Cream" },
    { hex: "#CDE3E6", name: "Light Blue" },
    { hex: "#F5BFCC", name: "Pink" },
  ];

  const hexToRgba = (hex, alpha = 0.5) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };


  const [selectedColor, setSelectedColor] = useState(moodColors[0]); // first color by default
  const [size, setSize] = useState("medium");
  const [shipping, setShipping] = useState("pickup");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [shippingDate, setShippingDate] = useState("");

  if (!isOpen) return null;

  const basePrice = Number(product.price.replace(/\./g, "")) || 15000;
  const sizePrice = size === "large" ? 8000 : 0;
  const shippingPrice = shipping === "home" ? 3000 : 0;
  const totalPrice = basePrice + sizePrice + shippingPrice;
  const imageSrc = product.sizeImages
    ? product.sizeImages[size]
    : product.cardImages[0];

  const summary = `Hello! I want to order: (${product.title})

Size: ${size === "medium" ? "Medium" : "Large"}
Mood color: ${selectedColor.name}

Shipping:
${
  shipping === "pickup"
    ? "Pickup"
    : `Send to home on ${shippingDate || "no date selected"}
Address: ${address}, ${detailAddress}`
}

Total price: ${totalPrice.toLocaleString()} won`;

  const whatsappLink = `https://wa.me/821043942212?text=${encodeURIComponent(summary)}`;

  return (
    <Modals isOpen={isOpen} onClose={onClose}>
      <div
        style={{
          padding: "1.5rem",
          fontFamily: "'Helvetica Neue', sans-serif",
          color: "#333",
        }}
      >
        {/* Product Image */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={imageSrc}
            alt={product.title}
            style={{
              width: "80%",
              height: "150px",
              objectFit: "contain",
              borderRadius: "1rem",
              boxShadow: `0 10px 30px ${hexToRgba(selectedColor.hex, 0.6)}`,
            }}
          />
        </div>

        {/* Product Title */}
        <h2 style={{ marginTop: "1rem", fontWeight: "600", textAlign:"center" }}>{product.title}</h2>

        {/* Mood Color Selection */}
        <div style={{ margin: "1rem 0", display: "flex", justifyContent: "center", gap: "1rem" }}>
          {moodColors.map((color, index) => {
            const isDark = color.hex.toLowerCase() === "#040102";
            return (
              <div
                key={index}
                onClick={() => setSelectedColor(color)}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "0.5rem",
                  backgroundColor: color.hex,
                  cursor: "pointer",
                  border: selectedColor.hex === color.hex ? "3px solid #ff7f50" : "2px solid #ccc",
                  position: "relative",
                  transition: "all 0.3s ease",
                }}
              >
                {selectedColor.hex === color.hex && (
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      textShadow: "0 0 2px rgba(0,0,0,0.5)",
                      color: isDark ? "white" : "black",
                    }}
                  >
                    ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Size selection */}
        <div style={{ margin: "1rem 0", display: "flex", justifyContent: "center", gap: "1rem" }}>
          {["medium", "large"].map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "2px solid",
                borderColor: size === s ? "#ff7f50" : "#ccc",
                background: size === s ? "linear-gradient(135deg, #ff7f50, #ffb347)" : "#fff",
                color: size === s ? "#fff" : "#333",
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.3s ease",
              }}
            >
              {s === "medium" ? "Medium" : "Large"}
            </button>
          ))}
        </div>

        {/* Shipping section */}
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

        {/* Total & Checkout */}
        <h3 style={{ marginTop: "1rem",textAlign:'center' }}>Total: {totalPrice.toLocaleString()} won</h3>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            marginTop: "1rem",
            padding: "0.75rem",
            background: "linear-gradient(135deg, #25D366, #128C7E)",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "0.5rem",
            textDecoration: "none",
            transition: "all 0.3s ease",
            textAlign:'center'
          }}
        >
          Checkout via WhatsApp
        </a>
      </div>
    </Modals>
  );
}
