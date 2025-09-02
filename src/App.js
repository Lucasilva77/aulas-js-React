import { useState } from "react";

export default function App() {
  const [time, setTime] = useState("Real Madrid");
  const [titulos, setTitulos] = useState(36);
  const [contador, setContador] = useState(0);

  function atualizarTime() {
    if (time === "Real Madrid") {
      setTime("Barcelona");
      setTitulos(28);
    } else {
      setTime("Real Madrid");
      setTitulos(36);
    }
  }

  function incrementarContador() {
    setContador(contador + 1);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-6">
      {/* Card do time */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center"> 
        <p className="text-xl font-semibold text-gray-800">
          O <span className="text-black">{time}</span> tem{" "}
          <span className="text-blue-600">{titulos}</span> títulos da La Liga.
        </p>
        <button
          onClick={atualizarTime}
          className="mt-4 px-6 py-2 bg-black text-white font-medium rounded-xl shadow hover:bg-gray-800 transition"
        >
          Trocar Time
        </button>
      </div>

      {/* Card do contador */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center">
        <p className="text-xl font-semibold text-gray-800">
          O contador está em{" "}
          <span className="text-green-600">{contador * 4}</span>.
        </p>
        <button
          onClick={incrementarContador}
          className="mt-4 px-6 py-2 bg-black text-white font-medium rounded-xl shadow hover:bg-gray-800 transition"
        >
          Somar * 4
        </button>
      </div>
    </div>
  );
}


// voce tera que fazer uma função que muda dois states que exibe na telaa numa mesma frase
// voce tera que fazer um state como contador, * 4