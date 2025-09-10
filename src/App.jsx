import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Header from './components/Header';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const carrinhoLS = localStorage.getItem('carrinho');
    if (carrinhoLS) setCarrinho(JSON.parse(carrinhoLS));
  }, []);

  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarAoCarrinho = (carta) => {
    setCarrinho((prev) => {
      const existe = prev.find((item) => item.id === carta.id);
      if (existe) {
        return prev.map((item) =>
          item.id === carta.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prev, { ...carta, quantidade: 1 }];
      }
    });
  };

  const quantidadeTotal = carrinho.reduce((total, item) => total + item.quantidade, 0);

  return (
    <Router>
      <Header carrinhoCount={quantidadeTotal} />

      <Routes>
        <Route
          path="/"
          element={<Home adicionarAoCarrinho={adicionarAoCarrinho} />}
        />
        <Route
          path="/carrinho"
          element={<Cart carrinho={carrinho} setCarrinho={setCarrinho} />}
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;