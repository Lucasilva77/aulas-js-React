import { useState } from "react";

export default function App() {
  const [valor, setValor] = useState("");
  const mensagem = "Você conseguiu!";

  const handleChange = (e) => {
    const digitado = Number(e.target.value); // transforma em número
    const resultado = digitado + 4;
    alert(`O resultado é: ${resultado}`);
    setValor(e.target.value);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>licao 1</h2>
      <input
        type="number"
        value={valor}
        onChange={handleChange}
        placeholder="Digite um número"
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          marginBottom: "20px"
        }}
      />

      <h2>licao 2</h2>
      <div
        onClick={() => alert(mensagem)}
        style={{
          padding: "12px",
          background: "lightblue",
          cursor: "pointer",
          width: "200px",
          textAlign: "center",
          borderRadius: "8px"
        }}
      >
        Clique aqui
      </div>
    </div>
  );
}


//1 atvdd
 //fzer um input com oncharge que a pessoa digitar ele vai somar com uma vareavel
 //com valor 4 e vai retornar o alert com o resultado

 //fazer onclick numa div com texto qualquer que retorne um alert o texto "voce conseguiu" de uma variavel