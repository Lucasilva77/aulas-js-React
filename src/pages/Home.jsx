
import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Filters from "../components/Filters";
import Card from "../components/card";
import Modal from "../components/Modal";
import "../styles/Home.css";
import setaVerde from "../assets/SetaEsquerda.png";

export default function Home({ adicionarAoCarrinho }) {
  const [cartas, setCartas] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState([]);
  const [atributoFiltro, setAtributoFiltro] = useState([]);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);

  const [mensagemModal, setMensagemModal] = useState("");

  const fetchCartas = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setCartas(data.data);
  };

  useEffect(() => {
    fetchCartas("https://db.ygoprodeck.com/api/v7/cardinfo.php");
  }, []);

  const handleBuscar = async () => {
    let urls = [];

    if (tipoFiltro.length > 0 && atributoFiltro.length > 0) {
      tipoFiltro.forEach((tipo) => {
        atributoFiltro.forEach((attr) => {
          urls.push(
            `https://db.ygoprodeck.com/api/v7/cardinfo.php?type=${encodeURIComponent(
              tipo
            )}&attribute=${encodeURIComponent(attr)}`
          );
        });
      });
    } else if (tipoFiltro.length > 0) {
      urls = tipoFiltro.map(
        (tipo) =>
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?type=${encodeURIComponent(
            tipo
          )}`
      );
    } else if (atributoFiltro.length > 0) {
      urls = atributoFiltro.map(
        (attr) =>
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?attribute=${encodeURIComponent(
            attr
          )}`
      );
    } else {
      urls = ["https://db.ygoprodeck.com/api/v7/cardinfo.php"];
    }

    try {
      const responses = await Promise.all(urls.map((url) => fetch(url)));
      const allData = await Promise.all(responses.map((res) => res.json()));

      const todasCartas = allData
        .flatMap((d) => d.data || [])
        .reduce((acc, carta) => {
          if (!acc.find((c) => c.id === carta.id)) acc.push(carta);
          return acc;
        }, []);

      setCartas(todasCartas);
      setPaginaAtual(1);
      setMensagemModal("Busca concluída!");
    } catch (err) {
      console.error("Erro na busca:", err);
      setMensagemModal("Erro ao buscar cartas!");
    }
  };

  const handleLimpar = () => {
    setTipoFiltro([]);
    setAtributoFiltro([]);
    fetchCartas("https://db.ygoprodeck.com/api/v7/cardinfo.php");
    setPaginaAtual(1);
    setMensagemModal("Filtros limpos!");
  };

  const handleTipoChange = (e) => {
    const { value, checked } = e.target;
    setTipoFiltro((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const handleAtributoChange = (e) => {
    const { value, checked } = e.target;
    setAtributoFiltro((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const totalPaginas = Math.ceil(cartas.length / itensPorPagina);
  const indexUltimo = paginaAtual * itensPorPagina;
  const indexPrimeiro = indexUltimo - itensPorPagina;
  const cartasExibidas = cartas.slice(indexPrimeiro, indexUltimo);

  const mudarPagina = (num) => {
    if (num >= 1 && num <= totalPaginas) {
      setPaginaAtual(num);
    }
  };

  const fecharModal = () => setMensagemModal("");

  const handleAdicionar = (carta) => {
    adicionarAoCarrinho(carta);
    setMensagemModal(<>O Produto <span className="destaque_modal">{carta.name} </span>foi adicionada ao carrinho!</>);
  };

  return (
    <div className="home">
      <Filters
        onTipoChange={handleTipoChange}
        onAtributoChange={handleAtributoChange}
        onBuscar={(cartas) => setCartas(cartas)}
        onLimpar={handleLimpar}
      />

      <div className="main-content">
        <Banner />

        <div className="controls">
          <div className="top-controls">
            <select
              id="itensSelect"
              value={itensPorPagina}
              onChange={(e) => {
                setItensPorPagina(Number(e.target.value));
                setPaginaAtual(1);
              }}
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
            <label htmlFor="itensSelect">Itens por página</label>
          </div>

          <div className="paginacao">
            <button
              onClick={() => mudarPagina(paginaAtual - 1)}
              disabled={paginaAtual === 1}
              className="paginacao-btn"
            >
              <img src={setaVerde} alt="Anterior" className="seta esquerda" />
            </button>

            {Array.from({ length: 5 }, (_, i) => {
              const blocoAtual = Math.floor((paginaAtual - 1) / 5);
              const primeiroNumero = blocoAtual * 5 + 1;
              const num = primeiroNumero + i;
              if (num <= totalPaginas) {
                return (
                  <button
                    key={num}
                    onClick={() => mudarPagina(num)}
                    className={paginaAtual === num ? "ativo" : ""}
                  >
                    {num}
                  </button>
                );
              }
              return null;
            })}

            <button
              onClick={() => mudarPagina(paginaAtual + 1)}
              disabled={paginaAtual === totalPaginas}
              className="paginacao-btn"
            >
              <img src={setaVerde} alt="Próximo" className="seta direita" />
            </button>
          </div>
        </div>

        <div className="card-grid">
          {cartasExibidas.map((carta) => (
            <Card
              key={carta.id}
              carta={carta}
              adicionarAoCarrinho={handleAdicionar}
            />
          ))}
        </div>
      </div>

      <Modal mensagem={mensagemModal} onClose={fecharModal} />
    </div>
  );
}