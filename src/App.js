import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useParams, useLocation } from "react-router-dom";

// Página inicial
function Home() {
  return (
    <div className="p-4">
      <h1>Página Inicial</h1>
      <div>
        <p>
          <Link to="/split/1">Ir para Split</Link>
        </p>
        <p>
          <Link to="/query?opcao=1">Ir para Query String</Link>
        </p>
      </div>
    </div>
  );
}

// Página Split (usa useParams + useEffect)
function SplitPage() {
  const { opcao } = useParams();
  const [conteudo, setConteudo] = useState("");

  useEffect(() => {
    switch (opcao) {
      case "1":
        setConteudo("Você escolheu a opção 1 via Split ");
        break;
      case "2":
        setConteudo("Você escolheu a opção 2 via Split ");
        break;
      case "3":
        setConteudo("Você escolheu a opção 3 via Split ");
        break;
      default:
        setConteudo("Opção inválida!");
    }
  }, [opcao]); // roda toda vez que o parâmetro mudar

  return (
    <div className="p-4">
      <h2>Página Split</h2>
      <p>{conteudo}</p>
      <div>
        <div>
          <Link to="/split/1">Opção 1</Link> |{" "}
          <Link to="/split/2">Opção 2</Link> |{" "}
          <Link to="/split/3">Opção 3</Link>
        </div>
      </div>
    </div>
  );
}

// Página Query String (usa useLocation + useEffect)
function QueryPage() {
  const location = useLocation();
  const [conteudo, setConteudo] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const opcao = params.get("opcao");

    switch (opcao) {
      case "1":
        setConteudo("Você escolheu a opção 1 via Query String ");
        break;
      case "2":
        setConteudo("Você escolheu a opção 2 via Query String ");
        break;
      case "3":
        setConteudo("Você escolheu a opção 3 via Query String ");
        break;
      case "4":
        setConteudo("Você escolheu a opção 4 via Query String ");
        break;
      case "5":
        setConteudo("Você escolheu a opção 5 via Query String ");
        break;
      default:
        setConteudo("Nenhuma opção válida!");
    }
  }, [location.search]); // roda toda vez que a query string mudar

  return (
    <div className="p-4">
      <h2>Página Query String</h2>
      <p>{conteudo}</p>
      <nav>
        <Link to="https://www.youtube.com/watch?v=_hlyCqz5gz0&list=PLn6DtETZdPVbe9BHb_CyHx30XKrIpBJYH&index=11">
          Opção 1
        </Link>{" "}
        |{" "}
        <Link to="https://www.youtube.com/watch?v=Yg2yrLdzysQ&list=PLn6DtETZdPVbe9BHb_CyHx30XKrIpBJYH&index=12">
          Opção 2
        </Link>{" "}
        |{" "}
        <Link to="https://www.youtube.com/watch?v=JDaZbbAUhEM&list=PLn6DtETZdPVbe9BHb_CyHx30XKrIpBJYH&index=13">
          Opção 3
        </Link>{" "}
        |{" "}
        <Link to="https://www.youtube.com/watch?v=6UXllHJeWLg&list=PLn6DtETZdPVbe9BHb_CyHx30XKrIpBJYH&index=14">
          Opção 4
        </Link>{" "}
        |{" "}
        <Link to="https://www.youtube.com/watch?v=ZqWnS_qGSbw&list=PLn6DtETZdPVbe9BHb_CyHx30XKrIpBJYH&index=15">
          Opção 5
        </Link>
      </nav>
    </div>
  );
}

// App principal
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/split/:opcao" element={<SplitPage />} />
      <Route path="/query" element={<QueryPage />} />
    </Routes>
  );
}

//primeira pagina colocar os 2 links mandando para duas PAGINAS DIFERENTES, uma voce vai
//tratar a condiÇâo do split, e na outra voce vai tratar a condiçao de query string

//SPLIT
// primeiro exercicio voce vai mostrar um link que tenha 3 opçoes dee parametro, voce vai
// exibir um conteudo diferente para cada caso

//QUERY STRING
// sengundo caso voçe vai montar um segundo link com 5 opçoes de parametro,voçe vai exibir
// um conteudo proprio, condizente com os 5 parametros
