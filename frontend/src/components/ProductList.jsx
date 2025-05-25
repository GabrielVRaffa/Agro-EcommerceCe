import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState('Todos');
  const tipos = ['Todos', 'Alimentos Naturais', 'Frutas', 'Hortifruti', 'Grãos', 'Hortaliças'];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('/produtos');
        setProducts(response.data);
      } catch (err) {
        setError('Erro ao carregar produtos');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>{error}</p>;

  const filteredProducts =
    filter === 'Todos'
      ? products
      : products.filter(prod => prod.type === filter);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <h2>Produtos da Agricultura Familiar</h2>

      {/* Dropdown para filtro */}
      <label htmlFor="categoriaFiltro" style={{ display: 'block', marginBottom: '1rem', fontWeight: 'bold' }}>
        Filtrar por categoria:
      </label>
      <select
        id="categoriaFiltro"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        style={{
          padding: '8px 12px',
          fontSize: '1rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
          marginBottom: '2rem',
          width: '250px',
          cursor: 'pointer',
        }}
      >
        {tipos.map(tipo => (
          <option key={tipo} value={tipo}>
            {tipo}
          </option>
        ))}
      </select>

      {/* Lista de produtos */}
      {filteredProducts.length === 0 ? (
        <p>Nenhum produto encontrado nessa categoria.</p>
      ) : (
        <ul style={{ padding: 0, display: 'flex', flexWrap: 'wrap', gap: '2rem', listStyle: 'none' }}>
          {filteredProducts.map(prod => {
            const precoNumero = Number(prod.price);
            const precoFormatado = !isNaN(precoNumero) ? precoNumero.toFixed(2) : 'Indisponível';

            return (
              <li
                key={prod.id}
                style={{
                  marginBottom: '20px',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  width: '260px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <img src={prod.image} alt={prod.name} width={150} style={{ borderRadius: '6px', alignSelf: 'center' }} />
                <div>
                  <h3>{prod.name}</h3>
                  <p>{prod.description}</p>
                  <p>
                    <strong>Preço:</strong> R$ {precoFormatado}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
