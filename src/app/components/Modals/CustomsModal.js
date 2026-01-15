"use client";
import React, { useState } from "react";
import Modals from "./Modals";
import ShippingMethod from "../ShippingMethod/ShippingMethod";

export default function CustomsModal({ isOpen, onClose, product }) {
  if (!isOpen || !product) return null;

  const [description, setDescription] = useState("");
  // const [files, setFiles] = useState([]);
  const [budget, setBudget] = useState(20000);
  const [shipping, setShipping] = useState("pickup");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [shippingDate, setShippingDate] = useState("");

  // const handleFileChange = (e) => setFiles([...e.target.files]);
  const increaseBudget = () => setBudget((prev) => prev + 5000);
  const decreaseBudget = () => setBudget((prev) => (prev > 20000 ? prev - 5000 : 20000));
  const handleBudgetChange = (e) => {
    const value = Number(e.target.value.replace(/\D/g, ""));
    if (!isNaN(value)) setBudget(value >= 20000 ? value : 20000);
  };

  const formattedBudget = `${budget.toLocaleString()} won`;

  const message = `Hello! I want to order: (${product.title})

Description:
${description || "No description"}

Shipping:
${
  shipping === "pickup"
    ? "Pickup"
    : `Send to home on ${shippingDate || "no date selected"}
Address: ${address}, ${detailAddress}`
}

Total price: ${formattedBudget}`;


  const whatsappLink = `https://wa.me/6289525594189?text=${encodeURIComponent(message)}`;

  return (
    <Modals isOpen={isOpen} onClose={onClose}>
      {/* Center content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
          overflowY: "auto",
          justifyContent: "center",
          fontFamily: "'Helvetica Neue', sans-serif",
          color: "#333",
        }}
      >
        {/* Product Image */}
          <div
            style={{
              display:'flex',
              justifyContent:"center"
            }}
        >
          <img
            src={product.cardImages[0]}
            alt={product.title}
            style={{
              width: "80%",
              height: "150px",
              objectFit: "contain",
              borderRadius: "1rem",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          />
        </div>

        {/* Product Title */}
        <h2 style={{ fontWeight: "600", textAlign: "center" }}>{product.title}</h2>

        {/* Description */}
        <div>
          <label style={{ fontWeight: "500" }}>Describe your custom bouquet</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Mau custom made kayak apa Qaqa? ..."
            rows={3}
            style={{
              width: "100%",
              marginTop: "0.25rem",
              padding: "0.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
              resize: "none",
              backgroundColor:"white",
              color:"black"
            }}
          />
        </div>

        {/* Upload Files */}
        {/* <div>
          <label style={{ fontWeight: "500" }}>Upload reference images</label>

          <input
            type="file"
            id="fileUpload"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <label
            htmlFor="fileUpload"
            style={{
              display: "inline-block",
              marginTop: "0.5rem",
              padding: "0.5rem 1rem",
              backgroundColor: "white",
              color: "black",
              border: "1px solid #ccc",
              borderRadius: "0.25rem",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            Choose Files
          </label>

          {files.length > 0 && (
            <div
              style={{
                marginTop: "0.5rem",
                fontSize: "0.85rem",
                backgroundColor: "white",
                color: "black",
              }}
            >
              {files.map((f, idx) => (
                <div key={idx}>{f.name}</div>
              ))}
            </div>
          )}
        </div> */}


        {/* Budget */}
        <div>
          <label style={{ fontWeight: "500" }}>Budget</label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}>
            <button onClick={decreaseBudget} style={buttonStyle}>-</button>
            <input
              type="text"
              value={formattedBudget}
              onChange={handleBudgetChange}
              style={{
                flex: 1,
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                textAlign: "center",
                backgroundColor:"white",
                color:"black"
              }}
            />
            <button onClick={increaseBudget} style={buttonStyle}>+</button>
          </div>
        </div>

        {/* Shipping */}
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

        {/* Checkout */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            padding: "0.75rem",
            background: "linear-gradient(135deg, #25D366, #128C7E)",
            color: "#fff",
            fontWeight: "600",
            borderRadius: "0.5rem",
            textDecoration: "none",
            textAlign: "center",
            transition: "all 0.3s ease",
          }}
        >
          Checkout via WhatsApp
        </a>
      </div>
    </Modals>
  );
}

// Helper styles
const buttonStyle = {
  padding: "0.5rem 0.75rem",
  borderRadius: "0.5rem",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
  color:"black"
};


