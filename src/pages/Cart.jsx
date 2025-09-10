import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/Cart.css";

function Cart({ carrinho, setCarrinho }) { 
  const [freteTipo, setFreteTipo] = useState("combinado");
  const [mensagem, setMensagem] = useState(""); 
  const navigate = useNavigate();

  const freteFixado = 15;
  const freteCombinado = 20;

  const frete = freteTipo === "fixo" ? freteFixado : freteCombinado;

  const subtotal = carrinho.reduce((acc, carta) => {
    const precoUSD = parseFloat(carta.card_prices?.[0]?.tcgplayer_price) || 0;
    const precoBRL = precoUSD * 5.2;
    return acc + precoBRL * carta.quantidade;
  }, 0);

  const total = subtotal + frete;

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const finalizarCompra = () => {
    setMensagem(" Compra finalizada com sucesso!");
    setCarrinho([]);


    setTimeout(() => {
      setMensagem("");
      navigate("/");
    }, 8000);
  };

  return (
    <div className="cart">
      <h2>
        CARRINHO DE <strong className="destaque_texto">COMPRAS</strong>
      </h2>

      <div className="cart-container">
        <div className="cart-items">
          {carrinho.length === 0 ? (
            <p>Seu carrinho está vazio.</p>
          ) : (
            carrinho.map((carta, index) => {
              const precoUSD = parseFloat(carta.card_prices?.[0]?.tcgplayer_price) || 0;
              const precoBRL = precoUSD * 5.2;

              return (
                <div key={index} className="cart-item">
                  <img src={carta.card_images[0].image_url_small} alt={carta.name} />
                  <div className="cart-item-info">
                    <h4>{carta.name}</h4>
                    <p className="descricao">{carta.desc}</p>
                    <div className="preço">
                      <p>Preço por unidade: <br /><span className="preço_destaque">R$ {precoBRL.toFixed(2)}</span></p>
                      <p>Quantidade: <br /><span className="preço_destaque">{carta.quantidade}</span></p>
                      <p>Total: <br /><span className="item_total">R${(precoBRL * carta.quantidade).toFixed(2)}</span></p>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {carrinho.length > 0 && (
            <div className="subtotal">
              <strong>Subtotal ({carrinho.length} itens): <br /></strong> 
              <span className="subtotal_destaque">R$ {subtotal.toFixed(2)}</span>
            </div>
          )}

          {carrinho.length > 0 && (
            <div className="cart-frete">
              <h3>Formas de <strong className="destaque_texto">envio</strong></h3>
              <label>
                <input
                  type="radio"
                  value="fixo"
                  checked={freteTipo === "fixo"}
                  onChange={() => setFreteTipo("fixo")}
                />
                Frete Fixo com rastreio (R$ {freteFixado.toFixed(2)}) <span className="frete_destaque">até 15 dias</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="combinado"
                  checked={freteTipo === "combinado"}
                  onChange={() => setFreteTipo("combinado")}
                />
                Frete combinado com o vendedor (R$ {freteCombinado.toFixed(2)})
              </label>
            </div>
          )}
        </div>

        {carrinho.length > 0 && (
          <div className="cart-summary">
            <h3>Resumo da <strong className="destaque_texto">Compra</strong></h3>
            <p>Total dos produtos: <br /> <strong className="valor_destaque">R$ {subtotal.toFixed(2)}</strong></p>
            <p>Valor do frete: <br /><strong className="valor_destaque">R$ {frete.toFixed(2)}</strong></p>
            <p className="total">TOTAL A PAGAR: <br /><strong className="total_destaque">R$ {total.toFixed(2)}</strong></p>

            <button className="finalizar-btn" onClick={finalizarCompra}>
              Finalizar Compra
            </button>
          </div>
        )}
      </div>

      {mensagem && (
        <div className="mensagem-overlay">
          <div className="mensagem-box">
            {mensagem}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;