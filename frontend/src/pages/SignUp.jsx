import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('PR');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMensagem('');
    setLoading(true);

    try {

      await axios.post('http://localhost:5000/user/register', {
        email,
        password,
        cnpj,
        cep,
        rua,
        numero,
        cidade,
        estado
        });

      setMensagem('Cadastro realizado com sucesso! Redirecionando para login...');
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

      <form onSubmit={handleSignup} className="signup-form">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          minLength={6}
          required
        />

        <label>CNPJ:</label>
        <input
          type="text"
          value={cnpj}
          onChange={e => setCnpj(e.target.value)}
          required
          maxLength={14}
          placeholder="Apenas números"
        />

        <h3>Endereço</h3>

        <label>CEP:</label>
        <input
          type="text"
          value={cep}
          onChange={e => setCep(e.target.value)}
          required
          maxLength={8}
          placeholder="Apenas números"
        />

        <label>Rua:</label>
        <input
          type="text"
          value={rua}
          onChange={e => setRua(e.target.value)}
          required
        />

        <label>Número:</label>
        <input
          type="text"
          value={numero}
          onChange={e => setNumero(e.target.value)}
          required
        />

        <label>Cidade:</label>
        <input
          type="text"
          value={cidade}
          onChange={e => setCidade(e.target.value)}
          required
        />

        <label>Estado:</label>
        <select
          value={estado}
          onChange={e => setEstado(e.target.value)}
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

      {mensagem && <p className="signup-message" style={{color: 'black'}}>{mensagem}</p>}
    </div>
  );
}

export default Signup;
