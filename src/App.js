import React from "react";

const App = () => {
  const pessoas = [
    {
      nome: "Ana Souza",
      idade: 25,
      nascimento: "15/03/1999",
      mae: "Maria Souza",
      pai: "João Souza",
    },
    {
      nome: "Carlos Pereira",
      idade: 32,
      nascimento: "08/07/1992",
      mae: "Fernanda Pereira",
      pai: "Nathan Pereira",
    },
    {
      nome: "Juliana Lima",
      idade: 28,
      nascimento: "22/11/1996",
      mae: "Patrícia Lima",
      pai:""
    },
    {
      nome: "Ricardo Alves",
      idade: 40,
      nascimento: "03/01/1984",
      mae: "Helena Alves",
      pai: "Carlos Alves",
    },
    {
      nome: "Beatriz Costa",
      idade: 19,
      nascimento: "10/09/2005",
      mae: "Cláudia Costa",
      pai:""
    },
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Lista de Pessoas</h1>
      <div>
        {pessoas.map((pessoa, index) => (
          <div key={index}>
            <b>Nome:</b> {pessoa.nome} <br />
            <b>Idade:</b> {pessoa.idade} anos <br />
            <b>Data de Nascimento:</b> {pessoa.nascimento} <br />
            <b>Mãe:</b> {pessoa.mae} <br />
            {pessoa.pai && (
              <>
                <strong>Pai:</strong> {pessoa.pai} <br />
              </>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;



