import React, { useState } from "react";

function ShippingMethod({
  shipping,
  setShipping,
  shippingDate,
  setShippingDate,
  detailAddress,
  setDetailAddress,
  address,
  setAddress,
}) {
  // Optional: initialize to min date if empty
  const minDate = "2026-02-15";
  const maxDate = "2026-02-18";

  return (
    <div>
      <label style={{ fontWeight: "500" }}>Shipping Method</label>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "0.25rem",
        }}
      >
        {/* Pickup Option */}
        <div onClick={() => setShipping("pickup")} style={shippingOptionStyle(shipping === "pickup")}>
          Pickup (Free)
        </div>

        {/* Home Delivery Option */}
        <div onClick={() => setShipping("home")} style={shippingOptionStyle(shipping === "home")}>
          Send to your home
          {shipping === "home" && (
            <div
              style={{ marginTop: "0.5rem" }}
              onClick={(e) => e.stopPropagation()} // Prevent parent click
            >
              <input
                type="date"
                value={shippingDate || minDate} // ✅ Default to minDate if empty
                onChange={(e) => setShippingDate(e.target.value)}
                min={minDate}
                max={maxDate}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={inputStyle}
              />
              <input
                type="text"
                placeholder="Detail Address"
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                style={inputStyle}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShippingMethod;

const shippingOptionStyle = (active) => ({
  padding: "0.75rem",
  borderRadius: "0.5rem",
  border: active ? "2px solid #ff7f50" : "1px solid #ccc",
  background: active ? "#fff2eb" : "#fff",
  cursor: "pointer",
  color: "black",
});

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "0.5rem",
  borderRadius: "0.25rem",
  border: "1px solid #ccc",
  marginBottom: "0.5rem",
  backgroundColor: "white",
  color: "black",
};
