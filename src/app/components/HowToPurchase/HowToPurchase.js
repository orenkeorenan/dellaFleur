import React from "react";

function HowToPurchase() {
  const steps = [
    { step: "1", title: "Choose Product", desc: "Select the flower, snack, or custom bouquet you like." },
    { step: "2", title: "Pick Options", desc: "Select color, size, quantity, or describe your custom bouquet." },
    { step: "3", title: "Shipping", desc: "Choose Pickup (Free) or Send to Home (+3,000 won) with address." },
    { step: "4", title: "Checkout", desc: "Click the WhatsApp button. Your order summary will appear to send." },
    { step: "5", title: "Confirmation", desc: "We will confirm your order and estimated delivery on WhatsApp." },
  ];

  return (
    <div
      style={{
        padding: "1.5rem",
        maxWidth: "450px",
        margin: "0 auto",
        fontFamily: "'Helvetica Neue', sans-serif",
        color: "#333",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>How to Purchase</h2>
      <p style={{ textAlign: "center", fontSize: "0.9rem", color: "#555", marginBottom: "1.5rem" }}>
        No account needed. Orders are placed directly via WhatsApp.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {steps.map(({ step, title, desc }) => (
          <div
            key={step}
            style={{
              display: "flex",
              gap: "0.75rem",
              alignItems: "flex-start",
              background: "#f9f9f9",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                minWidth: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "#ff7f50",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
                fontSize: "0.9rem",
              }}
            >
              {step}
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ display: "block", marginBottom: "0.25rem" }}>{title}</strong>
              <span style={{ fontSize: "0.85rem", color: "#555" }}>{desc}</span>
            </div>
          </div>
        ))}
      </div>

      <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.85rem", color: "#777" }}>
        After clicking WhatsApp, send the pre-filled message to complete your order.
      </p>
    </div>
  );
}

export default HowToPurchase;
