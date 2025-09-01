import { useState } from "react";

export default function InstrumentoChecker() {
  const [inputIfElse, setInputIfElse] = useState("");
  const [mensagemIfElse, setMensagemIfElse] = useState("");
  const [inputSwitch, setInputSwitch] = useState("");
  const [mensagemSwitch, setMensagemSwitch] = useState("");

  const verificarInstrumentoIfElse = () => {
    const valor = inputIfElse.toLowerCase();
    console.log("Valor digitado (if/else):", valor);

    if (valor === "guitarra") {
      setMensagemIfElse("Tem cordas ");
    } else if (valor === "bateria") {
      setMensagemIfElse("Tem pedal ");
    } else if (valor === "fios") {
      setMensagemIfElse("Não existe esse instrumento ");
    } else {
      setMensagemIfElse("Instrumento não reconhecido ");
    }
  };

  const verificarInstrumentoSwitch = () => {
    const valor = inputSwitch.toLowerCase();
    let msg;
    switch (valor) {
      case "violão":
        msg = "Tem paleta ";
        break;
      case "microfone":
        msg = "Tem caixa ";
        break;
      case "piano":
        msg = "Tem teclas ";
        break;
      default:
        msg = "Instrumento não reconhecido ";
    }

    setMensagemSwitch(msg);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center justify-center min-h-screen bg-gray-100 p-6">
     
      <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center">
        <p className="text-xl font-bold mb-4 text-blue-600">
          Verificação com IF/ELSE
        </p>

        <input
          type="text"
          placeholder="Digite um instrumento"
          value={inputIfElse}
          onChange={(e) => setInputIfElse(e.target.value)}
          className="border rounded-lg p-2 w-full text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <button
          onClick={verificarInstrumentoIfElse}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition w-full"
        >
          Verificar
        </button>

        {mensagemIfElse && (
          <p className="mt-4 text-lg font-medium text-gray-700">
            {mensagemIfElse}
          </p>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-2xl p-6 w-80 text-center">
        <p className="text-xl font-bold mb-4 text-green-600">
          Verificação com SWITCH
        </p>

        <input
          type="text"
          placeholder="Digite um instrumento"
          value={inputSwitch}
          onChange={(e) => setInputSwitch(e.target.value)}
          className="border rounded-lg p-2 w-full text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
        />

        <button
          onClick={verificarInstrumentoSwitch}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition w-full"
        >
          Verificar
        </button>

        {mensagemSwitch && (
          <p className="mt-4 text-lg font-medium text-gray-700">
            {mensagemSwitch}
          </p>
        )}
      </div>
    </div>
  );
}

