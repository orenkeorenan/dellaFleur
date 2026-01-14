import React, { useState, useEffect, useRef } from "react";

function CustomCalendar({ shippingDate, setShippingDate, minDate, maxDate }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  // Ensure default date is 18 February 2026
  useEffect(() => {
    if (!shippingDate) setShippingDate("2026-02-18");
  }, [shippingDate, setShippingDate]);

  // Generate allowed dates
  const getDatesBetween = (start, end) => {
    const arr = [];
    let dt = new Date(start);
    const last = new Date(end);
    while (dt <= last) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }
    return arr;
  };
  const allowedDates = getDatesBetween(minDate, maxDate);

  // Format date nicely
  const formatDate = (dateStr) => {
    const dt = new Date(dateStr);
    return dt.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Auto-scroll to selected date when dropdown opens
  useEffect(() => {
    if (open && containerRef.current) {
      const selected = containerRef.current.querySelector(".selected-date");
      if (selected) selected.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [open, shippingDate]);

  return (
    <div style={{ position: "relative", marginTop: "0.5rem" }}>
      <label style={{ fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>
        Shipping Date
      </label>

      {/* Input field */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          padding: "0.5rem 0.75rem",
          border: "1px solid #ccc",
          borderRadius: "0.5rem",
          cursor: "pointer",
          backgroundColor: "#fff",
          color: "#000",
        }}
      >
        {shippingDate ? formatDate(shippingDate) : "Select shipping date"}
      </div>

      {/* Dropdown / Scrollable Dates */}
      {open && (
        <div
          ref={containerRef}
          style={{
            position: "absolute",
            zIndex: 10,
            top: "100%",
            left: 0,
            right: 0,
            maxHeight: "150px",
            overflowY: "auto",
            marginTop: "0.25rem",
            border: "1px solid #ccc",
            borderRadius: "0.5rem",
            backgroundColor: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          {allowedDates.map((dateObj) => {
            const dateStr = dateObj.toISOString().split("T")[0];
            const isSelected = shippingDate === dateStr;
            return (
              <div
                key={dateStr}
                className={isSelected ? "selected-date" : ""}
                onClick={() => {
                  setShippingDate(dateStr);
                  setOpen(false);
                }}
                style={{
                  padding: "0.5rem 0.75rem",
                  cursor: "pointer",
                  backgroundColor: isSelected ? "#ffecd8" : "#fff",
                  color: isSelected ? "#ff7f50" : "#000",
                  fontWeight: isSelected ? "600" : "500",
                  borderBottom: "1px solid #eee",
                }}
              >
                {formatDate(dateStr)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CustomCalendar;
