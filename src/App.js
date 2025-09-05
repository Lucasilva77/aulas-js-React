import { useState, useEffect } from "react";

export default function EscalacoesComNomes() {
  const selecao2025 = [
    "Alisson", "Bento", "Hugo Souza", "Alex Sandro", "Caio Henrique",
    "Douglas Santos", "Fabrício Bruno", "Gabriel Magalhães", "Marquinhos", "Rickson Wesley", "Vanderson"
  ];

  const saoPaulo = [
    "Rafael", "Rafinha", "Arboleda", "Diego Costa", "Wellington",
    "Pablo Maia", "Alisson", "Rodrigo Nestor", "Luciano", "Calleri", "Wellington Rato"
  ];

  const flamengo = [
    "Rossi", "Varela", "Fabrício Bruno", "Léo Pereira", "Ayrton Lucas",
    "Pulgar", "Gerson", "Arrascaeta", "Everton Ribeiro", "Bruno Henrique", "Gabigol"
  ];

  const corinthians = [
    "Cássio", "Fagner", "Gil", "Murillo", "Fábio Santos",
    "Maycon", "Fausto Vera", "Renato Augusto", "Adson", "Yuri Alberto", "Roger Guedes"
  ];

 
  const nomesGenericos = [
    "Ana", "Bruno", "Carlos", "Daniela", "Eduardo", 
    "Fernanda", "Gustavo", "Helena", "Igor", "Julia", 
    "Kleber", "Larissa"
  ];

  const [jogadores, setJogadores] = useState([]);
  const [timeAtual, setTimeAtual] = useState("selecao");

  useEffect(() => {
    switch (timeAtual) {
      case "selecao":
        setJogadores(selecao2025);
        break;
      case "saoPaulo":
        setJogadores(saoPaulo);
        break;
      case "flamengo":
        setJogadores(flamengo);
        break;
      case "corinthians":
        setJogadores(corinthians);
        break;
      default:
        setJogadores([]);
    }
  }, [timeAtual]);

  const sortear10Itens = (lista) => {
    const copia = [...lista];
    const resultado = [];
    for (let i = 0; i < 10 && copia.length > 0; i++) {
      const indice = Math.floor(Math.random() * copia.length);
      resultado.push(copia[indice]);
      copia.splice(indice, 1);
    }
    return resultado;
  };

  const sortear10NomesGenericos = () => {
    const primeiroSorteio = sortear10Itens(nomesGenericos);
    setJogadores(primeiroSorteio);

    setTimeout(() => {
      let segundoSorteio;
      do {
        segundoSorteio = sortear10Itens(nomesGenericos);
      } while (segundoSorteio.join() === primeiroSorteio.join());

      setJogadores(segundoSorteio);
    }, 200);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <p className="text-2xl font-bold mb-4">Escalação - {timeAtual}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          onClick={() => setTimeAtual("selecao")}
        >
          Seleção 
        </button>
        <button
          className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          onClick={() => setTimeAtual("saoPaulo")}
        >
          São Paulo
        </button>
        <button
          className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          onClick={() => setTimeAtual("flamengo")}
        >
          Flamengo
        </button>
        <button
          className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          onClick={() => setTimeAtual("corinthians")}
        >
          Corinthians
        </button>
      </div>

      <div className="list-disc pl-5 space-y-1">
        {jogadores.map((j, i) => (
          <p key={i}>{j}</p>
        ))}
      </div>

      <button
        onClick={sortear10NomesGenericos}
        className="mt-4 px-4 py-2 border rounded hover:bg-gray-100 transition"
      >
        Sortear 10 nomes 2x
      </button>
    </div>
  );
}



// fazer aparecer a lista da seleção brasileira, so que voçe tera 3 botoes para trocar
// os nomes da seleção brasileira, para os jogadores do sao paulo, do flamengo e do 
//corinthians, 11 jogadores.
//uma função que mude na tela 10 nomes diferentes, ao clicar em um botão,muda 2 vezes