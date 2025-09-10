import React from "react";
import "../styles/Modal.css";

export default function Modal({ mensagem, onClose }) {
  if (!mensagem) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>{mensagem}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}