import React, { useState } from "react";
import CustomCalendar from "../CustomCalendar/CustomCalendar";

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
  const minDate = "2026-02-15";
  const maxDate = "2026-02-18";

  // Track if home inputs are shown
  const [homeActive, setHomeActive] = useState(false);

  const handleHomeClick = () => {
    setShipping("home");
    setHomeActive(true); // show calendar + address inputs
  };

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
        <div
          onClick={() => {
            setShipping("pickup");
            setHomeActive(false); // hide home inputs
          }}
          style={shippingOptionStyle(shipping === "pickup")}
        >
          Pickup (Free)
        </div>

        {/* Home Delivery Option */}
        <div style={shippingOptionStyle(shipping === "home")}>
          {/* Show text only if home inputs not active */}
          {!homeActive && (
            <div onClick={handleHomeClick} style={{ cursor: "pointer" }}>
              Send to your home
            </div>
          )}

          {homeActive && (
            <div
              style={{ marginTop: "0.5rem" }}
              onClick={(e) => e.stopPropagation()}
            >
              <CustomCalendar
                shippingDate={shippingDate}
                setShippingDate={setShippingDate}
                minDate={minDate}
                maxDate={maxDate}
              />

              {/* Address Inputs */}
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
