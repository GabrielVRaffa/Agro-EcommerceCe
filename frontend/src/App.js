import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);

useEffect(() => {
  fetch('http://localhost:5000/produtos')
    .then(res => res.json())
    .then(data => {
      console.log('✅ Dados recebidos do backend:', data); // ← Esta linha mostra no console
      setProdutos(data);
    })
    .catch(err => console.error('❌ Erro ao buscar produtos:', err));
}, []);


  return (
    <div className="App" style={{ padding: '2rem' }}>
      <h1>Produtos da Agricultura Familiar</h1>
      <ul>
        {produtos.map(produto => (
          <li key={produto.id}>
            <h2>{produto.name}</h2>
            <p>{produto.description}</p>
            <p><strong>Preço:</strong> R$ {produto.price ? Number(produto.price).toFixed(2) : 'Indisponível'}</p>
            <img src={produto.image} alt={produto.name} width="150" />
            <p><em>{produto.category}</em></p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
