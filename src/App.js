import React from "react";

export default function FilterExemplo() {
  // 1 Lista de produtos com boolean
  const lista = [
    { id: 1, nome: "Notebook", preco: 3500, ativo: true },
    { id: 2, nome: "Teclado", preco: 150, ativo: false },
    { id: 3, nome: "Mouse", preco: 90, ativo: true },
    { id: 4, nome: "Monitor", preco: 1200, ativo: false }
  ];

  // Filtra os inativos
  const inativos = lista.filter(item => item.ativo === false);

  // 2 Lista de frutas
  const frutas = [
    { id: 1, itens: ["abacaxi", "uva", "laranja"] },
    { id: 2, itens: ["manga", "abacaxi", "banana"] },
    { id: 3, itens: ["morango", "pera", "maçã"] }
  ];

  // Filtra os objetos que têm "abacaxi"
  const comAbacaxi = frutas.filter(obj => obj.itens.includes("abacaxi"));

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
   <p>lição 1</p>

      <p>Produtos inativos</p>
      <div>
        {inativos.map(item => (
          <p key={item.id}>
            {item.nome} - R$ {item.preco}
          </p>
        ))}
      </div>


   <p>lição 2</p>
      <p> Lista de frutas que possuem "abacaxi"</p>
      <div>
        {comAbacaxi.map(obj => (
          <p key={obj.id}>{obj.itens.join(", ")}</p>
        ))}
      </div>
    </div>
  );
}
