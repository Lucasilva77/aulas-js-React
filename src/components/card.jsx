import React from "react";
import "../styles/Card.css";

function Card({ carta, adicionarAoCarrinho }) {

  const precoUSD = parseFloat(carta.card_prices?.[0]?.tcgplayer_price) || 0;
  const cotacao = 5.20;
  const precoBRL = precoUSD * cotacao;

  return (
    <div className="card">
      <img src={carta.card_images[0].image_url_small} alt={carta.name} />
      <h4>{carta.name}</h4>

      <p className="preco">R$ {precoBRL.toFixed(2)}</p>

      <button
        onClick={() =>
          adicionarAoCarrinho({
            ...carta,
            price: precoBRL,
          })
        }
      >
        COMPRAR
      </button>
    </div>
  );
}

export default Card;