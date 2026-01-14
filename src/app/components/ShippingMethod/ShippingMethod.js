import React, { useState } from "react";
import CustomCalendar from "../CustomCalendar/CustomCalendar";

export default function ShippingMethod({
  shipping,
  setShipping,
  shippingDate,
  setShippingDate,
  detailAddress,
  setDetailAddress,
  address,
  setAddress,
}) {
  const openDaumPostcode = () => {
    if (typeof window !== "undefined" && window.daum) {
      new window.daum.Postcode({
        oncomplete: function (data) {
          // data.address = roadAddress, data.jibunAddress = old-style address
          setAddress(data.roadAddress);
          // optional: focus detail address after selection
          document.getElementById("detailAddress")?.focus();
        },
      }).open();
    }
  };
  
  const minDate = "2026-02-15";
  const maxDate = "2026-02-18";

  const [homeActive, setHomeActive] = useState(false);

  const handleHomeClick = () => {
    setShipping("home");
    setHomeActive(true);
  };

  

  return (
    <div>
      <label style={{ fontWeight: "500" }}>Shipping Method</label>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.25rem" }}>
        {/* Pickup Option */}
        <div
          onClick={() => {
            setShipping("pickup");
            setHomeActive(false);
          }}
          style={shippingOptionStyle(shipping === "pickup")}
        >
          Pickup (Free)
        </div>

        {/* Home Delivery Option */}
        <div style={shippingOptionStyle(shipping === "home")}>
          {!homeActive && (
            <div onClick={handleHomeClick} style={{ cursor: "pointer" }}>
              Send to your home
            </div>
          )}

          {homeActive && (
            <div style={{ marginTop: "0.5rem" }} onClick={(e) => e.stopPropagation()}>
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
                onClick={openDaumPostcode} // open Daum API popup
                readOnly // prevent typing manually
                style={inputStyle}
              />
              <input
                type="text"
                id="detailAddress"
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
  cursor: "pointer",
};
