import React from "react";

function QRCard({ business }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h3>{business.name}</h3>
      <p>Scan QR to review</p>
    </div>
  );
}

export default QRCard;