import React, { useState, useEffect } from 'react';
import '../App.css';
import { useCart } from '../components/CartContext';

function Products() {
  const [produtos, setProdutos] = useState([]);
  const [filter, setFilter] = useState('Todos');
  const { addToCart } = useCart();

  // Buscar produtos do backend
  useEffect(() => {
    fetch('http://localhost:5000/produtos')
      .then(res => res.json())
      .then(data => {
        console.log('✅ Dados recebidos do backend:', data);
        setProdutos(data);
      })
      .catch(err => console.error('❌ Erro ao buscar produtos:', err));
  }, []);

  const categorias = ['Todos', ...new Set(produtos.map(p => p.category))];

  const produtosFiltrados =
    filter === 'Todos'
      ? produtos
      : produtos.filter(p => p.category === filter);

  return (
    <div className="page-content App">
      <h1>Produtos da Agricultura Familiar</h1>

      {/* Filtro de categoria */}
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

      <ul>
        {produtosFiltrados.map(produto => (
          <li key={produto.id} style={{ marginBottom: '2rem', listStyle: 'none' }}>
            <h2>{produto.name}</h2>
            <p>{produto.description}</p>
            <p>
              <strong>Preço:</strong>{' '}
              R$ {produto.price ? Number(produto.price).toFixed(2) : 'Indisponível'}
            </p>
            <img src={produto.image} alt={produto.name} width="150" />
            <p><em>{produto.category}</em></p>

            <div className="produto-formulario">
  <form
    onSubmit={e => {
      e.preventDefault();
      const quantidade = parseInt(e.target.quantidade.value, 10);
      if (quantidade >= 10) {
        addToCart(produto, quantidade);
        e.target.reset();
        alert('Produto adicionado ao carrinho!');
      } else {
        alert('Quantidade mínima é 10 unidades.');
      }
    }}
  >
    <input
      type="number"
      name="quantidade"
      min="10"
      placeholder="Quantidade"
      required
    />
    <button type="submit">Adicionar ao Carrinho</button>
  </form>
</div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;
