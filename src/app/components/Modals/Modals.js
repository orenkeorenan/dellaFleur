"use client"

import React, { useEffect } from "react";

export default function Modals({ isOpen, onClose, children }) {
  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!isOpen) return null; // don’t render if not open

  return (
    <div
      onClick={onClose} // click background to close
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "1rem",
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside modal
        style={{
          backgroundColor: "#fff",
          borderRadius: "0.5rem",
          width: "100%",
          maxWidth: "400px",
          padding: "1.5rem",
          position: "relative",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          maxHeight:"90vh"
        }}
      >
        {/* X Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "0.5rem",
            right: "0.5rem",
            background: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          ×
        </button>

        {/* Modal content */}
        {children}
      </div>
    </div>
  );
}
