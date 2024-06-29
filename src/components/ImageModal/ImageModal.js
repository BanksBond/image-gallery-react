import React from "react";
import "./ImageModal.css";

export default function ImageModal({ show, image, onClose }) {
  if (!show) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <img src={image} alt="cat"></img>
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
    </div>
  );
}
