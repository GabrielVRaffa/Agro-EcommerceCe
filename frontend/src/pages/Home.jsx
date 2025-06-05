import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'
import saboresdaroca from '../assets/saboresdaroca.png'


function Home() {
  return (
    <div className="App" style={{ padding: '2rem' }}>
      <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
        <img src={saboresdaroca} style={{height: '200px'}} alt = "Logo"></img>
      </div>
      <h1>Bem-vindo à Sabores da Roça</h1>
      <h3>Somos uma empresa de venda e distribuição de produtos da Agricultura Familiar. Entregamos para mercados de toda a região Sul.</h3>
      <h3> Faça seu pedido!</h3>
      <p>Confira nossos produtos fresquinhos e naturais.</p>
      <p>
      <Link to="/products" style={{ fontSize: '1.2rem', color: 'white', textAlign: 'center'}}>
        <strong>Ver Produtos</strong>
      </Link>
      </p>
    </div>
  );
}

export default Home;