import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';

function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    cnpj: '',
    cep: '',
    rua: '',
    numero: '',
    cidade: '',
    estado: 'PR',
  });

  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setMensagem('');
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/user/register', formData);
      setMensagem('✅ Cadastro realizado com sucesso! Redirecionando para login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      if (error.response?.data?.error) {
        setMensagem(`❌ ${error.response.data.error}`);
      } else {
        setMensagem('❌ Erro ao conectar com o servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Cadastro</h2>

      <form onSubmit={handleSignup} className="signup-form" noValidate>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="exemplo@dominio.com"
        />

        <label htmlFor="password">Senha:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          minLength={6}
          required
          placeholder="Mínimo 6 caracteres"
        />

        <label htmlFor="cnpj">CNPJ:</label>
        <input
          id="cnpj"
          name="cnpj"
          type="text"
          value={formData.cnpj}
          onChange={handleChange}
          maxLength={14}
          required
          placeholder="Apenas números"
        />

        <h3>Endereço</h3>

        <label htmlFor="cep">CEP:</label>
        <input
          id="cep"
          name="cep"
          type="text"
          value={formData.cep}
          onChange={handleChange}
          maxLength={8}
          required
          placeholder="Apenas números"
        />

        <label htmlFor="rua">Rua:</label>
        <input
          id="rua"
          name="rua"
          type="text"
          value={formData.rua}
          onChange={handleChange}
          required
          placeholder="Nome da rua"
        />

        <label htmlFor="numero">Número:</label>
        <input
          id="numero"
          name="numero"
          type="text"
          value={formData.numero}
          onChange={handleChange}
          required
          placeholder="Número da residência"
        />

        <label htmlFor="cidade">Cidade:</label>
        <input
          id="cidade"
          name="cidade"
          type="text"
          value={formData.cidade}
          onChange={handleChange}
          required
          placeholder="Cidade"
        />

        <label htmlFor="estado">Estado:</label>
        <select
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          required
        >
          <option value="PR">Paraná (PR)</option>
          <option value="RS">Rio Grande do Sul (RS)</option>
          <option value="SC">Santa Catarina (SC)</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>

      {mensagem && (
        <p
          className="signup-message"
          style={{ color: mensagem.startsWith('✅') ? 'green' : 'red' }}
        >
          {mensagem}
        </p>
      )}

      <p className="login-link">
        Já tem uma conta? <Link to="/login">Clique aqui para fazer login</Link>.
      </p>
    </div>
  );
}

export default Signup;
