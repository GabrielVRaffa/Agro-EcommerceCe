import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';

function AdminProducts() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
  });
  const [editandoId, setEditandoId] = useState(null);
  const [editForm, setEditForm] = useState({});

  // Buscar produtos
  const fetchProdutos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/produtos');
      setProdutos(res.data);
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Criar novo produto
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/produtos', novoProduto);
      setNovoProduto({ name: '', description: '', price: '', image: '', category: '' });
      fetchProdutos();
    } catch (err) {
      console.error('Erro ao criar produto:', err);
    }
  };

  // Atualizar produto
  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/produtos/${id}`, editForm);
      setEditandoId(null);
      fetchProdutos();
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
    }
  };

  // Deletar produto
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await axios.delete(`http://localhost:5000/produtos/${id}`);
        fetchProdutos();
      } catch (err) {
        console.error('Erro ao excluir produto:', err);
      }
    }
  };

  return (
    <div className="page-content App">
      <h1>Administração de Produtos</h1>

      {/* Formulário de novo produto */}
    <form className="novo-produto-card" onSubmit={handleCreate} style={{color: 'black', paddingRight: '3rem'}}>
        <h2>Cadastrar novo produto</h2>
        <input
            type="text"
            placeholder="Nome"
            value={novoProduto.name}
            onChange={(e) => setNovoProduto({ ...novoProduto, name: e.target.value })}
            required
        />
        <input
            type="text"
            placeholder="Descrição"
            value={novoProduto.description}
            onChange={(e) => setNovoProduto({ ...novoProduto, description: e.target.value })}
            required
        />
        <input
            type="number"
            placeholder="Preço"
            value={novoProduto.price}
            onChange={(e) => setNovoProduto({ ...novoProduto, price: e.target.value })}
            required
        />
        <input
            type="text"
            placeholder="URL da Imagem"
            value={novoProduto.image}
            onChange={(e) => setNovoProduto({ ...novoProduto, image: e.target.value })}
            required
        />
        <input
            type="text"
            placeholder="Categoria"
            value={novoProduto.category}
            onChange={(e) => setNovoProduto({ ...novoProduto, category: e.target.value })}
            required
        />
        <button type="submit">Criar Produto</button>
    </form>
      <hr />

      {/* Lista de produtos existentes */}
      <ul>
        {produtos.map((produto) => (
            
          <li key={produto.id} style={{ marginBottom: '2rem', listStyle: 'none' }}>
            {editandoId === produto.id ? (
              <>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                />
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                />
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                />
                <input
                  type="text"
                  value={editForm.image}
                  onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                />
                <input
                  type="text"
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                />
                <button onClick={() => handleUpdate(produto.id)}>Salvar</button>
                <button onClick={() => setEditandoId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <h2 style={{textAlign: 'center'}}>{produto.name}</h2>
                <p>{produto.description}</p>
                <p><strong>Preço:</strong> R$ {Number(produto.price).toFixed(2)}</p>
                <img src={produto.image} alt={produto.name} width="150" />
                <p><em>{produto.category}</em></p>
                <button style={{marginBottom:'1rem'}} className="editar" onClick={() => {
                    setEditandoId(produto.id);
                    setEditForm(produto);
                }}>Editar</button>
                <button style={{color: 'darkred'}} className="excluir" onClick={() => handleDelete(produto.id)}>Excluir</button>
              </>
            )}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminProducts;
