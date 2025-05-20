import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h2>Produtos da Agricultura Familiar</h2>
      <ul>
        {products.map(prod => {
          // Converte para número, tenta tratar preço inválido
          const precoNumero = Number(prod.price);
          const precoFormatado = !isNaN(precoNumero) ? precoNumero.toFixed(2) : 'Indisponível';

          return (
            <li key={prod.id}>
              <h3>{prod.name}</h3>
              <p>{prod.description}</p>
              <p>Preço: R$ {precoFormatado}</p>
              <img src={prod.image} alt={prod.name} width={150} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProductList;
