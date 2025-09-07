import React from "react";
import "../styles/AlertBox.css";
const AlertBox = ({ message, type = "info", onClose }) => {
  return (
    <div className="alert-overlay">
      <div className={`alert-box ${type}`}>
        <p>{message}</p>
        <button onClick={onClose} className="alert-btn">OK</button>
      </div>
    </div>
  );
};

export default AlertBox; // ✅ default export

