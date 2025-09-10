import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header({ carrinhoCount }) {
  return (
    <header className="header">
      <img className="logo" src="./logo/logo.png" alt="logo FPR" />

      <input type="text" placeholder="Pesquisar" className="search" />

      <Link to="/carrinho" title="Carrinho">
        <img src="./logo/carrinho.png" alt="imagem de um Carrinho" />
        {carrinhoCount > 0 && <span className="badge" >{carrinhoCount}</span>}
      </Link>
    </header>
  );
}

export default Header;