"use client";
import React, { useState } from "react";
import Modals from "./Modals";
import ShippingMethod from "../ShippingMethod/ShippingMethod";

export default function SnacksModal({ isOpen, onClose, product }) {
  if (!isOpen) return null;

  const initialItems = [
    { name: "Beng Beng", price: 2000, quantity: 0, image: "/Bengbeng.png" },
    { name: "Ferero", price: 1500, quantity: 0, image: "/ferero.png" },
    { name: "Hershey's", price: 3000, quantity: 0, image: "/Hersley.png" },
    { name: "KinderJoy", price: 3500, quantity: 0, image: "/kinderJoy.png" },
    { name: "불닭라면", price: 2500, quantity: 0, image: "/samyang.jpg" },
    { name: "Indomie", price: 1500, quantity: 0, image: "/indomie.jpg" },
    { name: "Candy ❤️ Pick (Acc)", price: 6000, quantity: 0, image: "/acc1.png" },
  ];


  const [items, setItems] = useState(initialItems);
  const [shipping, setShipping] = useState("pickup");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [shippingDate, setShippingDate] = useState("");
  const [previewImage, setPreviewImage] = useState(null);


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

  const basicOrder = 10000; // Base bouquet
  const itemsTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = shipping === "home" ? 3000 : 0;
  const totalPrice = basicOrder + itemsTotal + shippingPrice;

  const minOrder = 20000 - basicOrder;
  const canCheckout = itemsTotal >= minOrder;

  // Create WhatsApp summary
  const orderedItems = items
  .filter((item) => item.quantity > 0)
  .map((item) => `- ${item.name} x${item.quantity}`)
  .join("\n") || "- No extra snacks";


  const summary = `Hello! I want to order: (${product.title})

Base bouquet: 10,000 won

Snacks:
${orderedItems}

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
    <>
      <Modals isOpen={isOpen} onClose={onClose}>
        <div
          style={{
            padding: "0",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Helvetica Neue', sans-serif",
            color: "#333",
            borderRadius: "1rem",
          }}
        >
          {/* Product Image & Title */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={product.cardImages}
              alt={product.title}
              style={{
                width: "80%",
                height: "150px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                objectFit: "contain",
                borderRadius: "1rem",
              }}
            />
          </div>
          <h2 style={{ fontWeight: "600", textAlign: "center" ,padding:"1rem"}}>{product.title}</h2>

          <div>
            <div style={{ fontWeight: "bold", gap: ".4rem", display: "flex" }}>
              Basic Bouquet 
              <span style={{ fontSize: ".85rem" }}>(10,000 won)</span>
            </div>
            <div style={{ fontStyle: "italic" }}>*snacks and congratulations card included</div>
          </div>

          {/* Scrollable Items */}
          <div style={{ padding: "1rem", overflowY: "auto", flex: "1 1 auto" }}>
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
                    gap: "0.75rem",
                  }}
                >
                  {/* Left: Image + Info */}
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}
                    onClick={() => setPreviewImage(item.image)}
                  >
                    {/* <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "0.5rem",
                        objectFit: "contain",
                      }}
                    /> */}
                    <div>
                      <div style={{ fontWeight: "500",textDecoration:"underline" }}>{item.name}</div>
                      <div style={{ fontSize: "0.85rem", color: "#555" }}>
                        {item.price.toLocaleString()} won / pcs
                      </div>
                    </div>
                  </div>

                  {/* Right: Quantity Controls */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <button 
                      onClick={() => decreaseQty(idx)}
                      style={buttonStyle}
                    >
                      −
                    </button>
                      <span>{item.quantity}</span>
                    <button 
                      onClick={() => increaseQty(idx)}
                      style={buttonStyle}
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
                  Minimum items order: {minOrder.toLocaleString()} won (excluding base bouquet)
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
      {previewImage && (
        <Modals isOpen={true} onClose={() => setPreviewImage(null)}>
          <div
            style={{
              padding: "1rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={previewImage}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                borderRadius: "1rem",
                objectFit: "contain",
              }}
            />
          </div>
        </Modals>
      )}

    </>
  );
}


const buttonStyle = {
  padding: "0.5rem 0.75rem",
  borderRadius: "0.5rem",
  border: "1px solid #ccc",
  background: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
  color:"black"
};
