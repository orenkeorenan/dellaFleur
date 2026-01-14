import React from 'react'

function ShippingMethod({shipping,setShipping, shippingDate,setShippingDate,detailAddress,setDetailAddress,address,setAddress}) {
    
    
  return (
    <div>
        <label style={{ fontWeight: "500" }}>Shipping Method</label>
        <div 
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.25rem" }}>
        <div onClick={() => setShipping("pickup")} style={shippingOptionStyle(shipping === "pickup")}>
            Pickup (Free)
        </div>
        <div onClick={() => setShipping("home")} style={shippingOptionStyle(shipping === "home")}>
            Send to your home
            {shipping === "home" && (
            <div style={{ marginTop: "0.5rem" }}>
                <input type="date" value={shippingDate} onChange={(e) => setShippingDate(e.target.value)} min="2026-02-15" max="2026-02-18" style={inputStyle} />
                <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} style={inputStyle} />
                <input type="text" placeholder="Detail Address" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} style={inputStyle} />
            </div>
            )}
        </div>
        </div>
    </div>
  )
}


export default ShippingMethod

const shippingOptionStyle = (active) => ({
  padding: "0.75rem",
  borderRadius: "0.5rem",
  border: active ? "2px solid #ff7f50" : "1px solid #ccc",
  background: active ? "#fff2eb" : "#fff",
  cursor: "pointer",
});

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "0.5rem",
  borderRadius: "0.25rem",
  border: "1px solid #ccc",
  marginBottom: "0.5rem",
  backgroundColor:"white",

};

