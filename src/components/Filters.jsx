import React, { useEffect, useState, useRef } from "react";
import "../styles/Filters.css";

// Races válidos aceitos pela API (case-insensitive)
const validRaces = new Set([
  "continuous","zombie","fiend","normal","quick-play","rock","warrior","winged beast",
  "spellcaster","beast","fairy","equip","field","fish","beast-warrior","thunder","machine",
  "sea serpent","aqua","plant","dragon","reptile","counter","psychic","insect","pyro",
  "dinosaur","wyrm","cyberse","ritual","divine-beast","creator god","illusion","cyverse"
]);

// 🔹 Grupo de monstros -> para exibir como "Monstro"
const monsterTypes = new Set([
  "effect","normal","ritual","fusion","synchro","xyz","link",
  "effect_pendulum","normal_pendulum","ritual_pendulum","fusion_pendulum",
  "synchro_pendulum","xyz_pendulum"
]);

// typeline -> type (nome exato que a API espera)
const typelineToTypeMap = {
  effect: "Effect Monster",
  normal: "Normal Monster",
  ritual: "Ritual Monster",
  fusion: "Fusion Monster",
  synchro: "Synchro Monster",
  xyz: "XYZ Monster",
  link: "Link Monster",
  spell: "Spell Card",
  trap: "Trap Card",
  token: "Token",
  skill: "Skill Card",
  pendulum: ["Pendulum Normal Monster", "Pendulum Effect Monster"],
};

// frameType -> type (nome exato que a API espera)
const frameTypeToTypeMap = {
  effect: "Effect Monster",
  normal: "Normal Monster",
  ritual: "Ritual Monster",
  fusion: "Fusion Monster",
  synchro: "Synchro Monster",
  xyz: "XYZ Monster",
  link: "Link Monster",
  spell: "Spell Card",
  trap: "Trap Card",
  token: "Token",
  skill: "Skill Card",
  pendulum: ["Pendulum Normal Monster", "Pendulum Effect Monster"],
};

// 🔹 Labels simplificadas
const tipoCartaLabels = {
  monstro: "Monstro",
  spell: "Mágica",
  trap: "Armadilha",
  counter: "Counter",
  skill: "Skill Card",
  token: "Token",
};

function Filters({ onBuscar }) {
  const [tiposAtributos, setTiposAtributos] = useState([]);
  const [tiposCarta, setTiposCarta] = useState([]);

  const [selectedAtributos, setSelectedAtributos] = useState([]);
  const [selectedTipos, setSelectedTipos] = useState([]);

  const [allCards, setAllCards] = useState([]);

  // 🔹 Controle de scroll (mostrar 20 por vez)
  const [visibleAttrCount, setVisibleAttrCount] = useState(20);
  const [visibleTipoCount, setVisibleTipoCount] = useState(20);

  const attrContainerRef = useRef(null);
  const tipoContainerRef = useRef(null);

  // 🔹 Listener para scroll infinito
  const handleScroll = (ref, total, setCount) => {
    if (!ref.current) return;
    const { scrollTop, scrollHeight, clientHeight } = ref.current;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      setCount((prev) => Math.min(prev + 20, total));
    }
  };

  // 🔹 Carrega todas as cartas e popula os filtros
  useEffect(() => {
    fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php")
      .then((res) => res.json())
      .then((data) => {
        if (!data?.data) return;

        setAllCards(data.data);

        const allTiposAtributos = [
          ...new Set(data.data.flatMap((c) => c.typeline || [])),
        ].sort((a, b) => a.localeCompare(b));

        // 🔹 Agrupa todos os monstros em um único "monstro"
        const rawTiposCarta = [
          ...new Set(data.data.map((c) => c.frameType).filter(Boolean)),
        ];

        const allTiposCarta = [];
        if (rawTiposCarta.some((t) => monsterTypes.has(t))) {
          allTiposCarta.push("monstro");
        }
        rawTiposCarta.forEach((t) => {
          if (!monsterTypes.has(t)) allTiposCarta.push(t);
        });

        // 🔹 Ordena alfabeticamente pelos labels
        allTiposCarta.sort((a, b) => {
          const labelA = tipoCartaLabels[a] || a;
          const labelB = tipoCartaLabels[b] || b;
          return labelA.localeCompare(labelB);
        });

        setTiposAtributos(allTiposAtributos);
        setTiposCarta(allTiposCarta);
      })
      .catch((err) => console.error("Erro ao carregar filtros:", err));
  }, []);

  const handleAtributoChange = (e) => {
    const value = e.target.value;
    setSelectedAtributos((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleTipoChange = (e) => {
    const value = e.target.value;
    setSelectedTipos((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const dedupeById = (arr) => {
    const map = new Map();
    arr.forEach((card) => map.set(card.id, card));
    return Array.from(map.values());
  };

  const handleBuscar = () => {
    try {
      const races = new Set();
      const types = new Set();

      selectedAtributos.forEach((raw) => {
        const key = String(raw).toLowerCase();
        if (validRaces.has(key)) {
          races.add(raw);
        } else {
          const mapped = typelineToTypeMap[key];
          if (Array.isArray(mapped)) mapped.forEach((t) => types.add(t));
          else if (mapped) types.add(mapped);
        }
      });

      selectedTipos.forEach((raw) => {
        if (raw === "monstro") {
          Object.entries(frameTypeToTypeMap).forEach(([k, v]) => {
            if (monsterTypes.has(k)) {
              if (Array.isArray(v)) v.forEach((t) => types.add(t));
              else types.add(v);
            }
          });
        } else {
          const key = String(raw).toLowerCase();
          const mapped = frameTypeToTypeMap[key];
          if (Array.isArray(mapped)) mapped.forEach((t) => types.add(t));
          else if (mapped) types.add(mapped);
        }
      });

      let filtradas = allCards;

      if (races.size > 0) {
        filtradas = filtradas.filter((c) => c.race && races.has(c.race));
      }

      if (types.size > 0) {
        filtradas = filtradas.filter((c) => {
          if (!c.type) return false;
          return Array.from(types).includes(c.type);
        });
      }

      const unique = dedupeById(filtradas);
      if (onBuscar) onBuscar(unique);
    } catch (err) {
      console.error("Erro na pesquisa:", err);
      if (onBuscar) onBuscar([]);
    }
  };

  const handleLimpar = () => {
    setSelectedAtributos([]);
    setSelectedTipos([]);
    if (onBuscar) onBuscar(allCards);
  };

  return (
    <div className="filters">
      <h1 className="titulo_filter">FILTROS</h1>

      <div
        className="filters_tipo"
        ref={attrContainerRef}
        style={{ maxHeight: "400px", overflowY: "auto" }}
        onScroll={() =>
          handleScroll(attrContainerRef, tiposAtributos.length, setVisibleAttrCount)
        }
      >
        <h3>TIPO / ATRIBUTO</h3>
        {tiposAtributos.slice(0, visibleAttrCount).map((attr) => (
          <label key={attr}>
            <input
              type="checkbox"
              value={attr}
              checked={selectedAtributos.includes(attr)}
              onChange={handleAtributoChange}
            />
            {attr}
          </label>
        ))}
      </div>

      <div
        className="filters_tipo"
        ref={tipoContainerRef}
        style={{ maxHeight: "200px", overflowY: "auto" }}
        onScroll={() =>
          handleScroll(tipoContainerRef, tiposCarta.length, setVisibleTipoCount)
        }
      >
        <h3>TIPO CARTA</h3>
        {tiposCarta.slice(0, visibleTipoCount).map((tipo) => (
          <label key={tipo}>
            <input
              type="checkbox"
              value={tipo}
              checked={selectedTipos.includes(tipo)}
              onChange={handleTipoChange}
            />
            {tipoCartaLabels[tipo] || tipo}
          </label>
        ))}
      </div>

      <div className="filter-buttons">
        <button onClick={handleBuscar}>PESQUISAR</button>
        <button onClick={handleLimpar}>LIMPAR FILTROS</button>
      </div>
    </div>
  );
}

export default Filters;