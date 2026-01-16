import React from "react";

function WhatsappButton() {
  const phoneNumber = "821043942212"; 
  const message = "Tanya tanya soal Bunga dong kak?";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        color: "white",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "28px",
        textDecoration: "none",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        zIndex: 1000,
      }}
    >
      💬
    </a>
  );
}

export default WhatsappButton;
