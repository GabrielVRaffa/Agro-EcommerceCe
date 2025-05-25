import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [filter, setFilter] = useState('Todos');

const categorias = ['Todos', ...new Set(produtos.map(p => p.category))];


  useEffect(() => {
    fetch('http://localhost:5000/produtos')
      .then(res => res.json())
      .then(data => {
        console.log('✅ Dados recebidos do backend:', data);
        setProdutos(data);
      })
      .catch(err => console.error('❌ Erro ao buscar produtos:', err));
  }, []);

  const produtosFiltrados =
    filter === 'Todos'
      ? produtos
      : produtos.filter(p => p.category === filter);

  return (
    <div className="App" style={{ padding: '2rem' }}>
      {/* Filtro fixo à esquerda */}
      <div className="filtro-global">
        <label htmlFor="categoriaFiltro">Filtrar por categoria:</label>
        <select
          id="categoriaFiltro"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <h1>Produtos da Agricultura Familiar</h1>

      <ul>
        {produtosFiltrados.map(produto => (
          <li key={produto.id}>
            <h2>{produto.name}</h2>
            <p>{produto.description}</p>
            <p>
              <strong>Preço:</strong>{' '}
              R$ {produto.price ? Number(produto.price).toFixed(2) : 'Indisponível'}
            </p>
            <img src={produto.image} alt={produto.name} width="150" />
            <p>
              <em>{produto.category}</em>
            </p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
