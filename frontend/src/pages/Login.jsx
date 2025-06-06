import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        email,
        password,
      });

      setMensagem(`✅ Bem-vindo, ${response.data.user.email}`);
      login(response.data.token);
      navigate('/');
    } catch (err) {
      if (err.response?.data?.error) {
        setMensagem(`❌ ${err.response.data.error}`);
      } else {
        setMensagem('❌ Erro ao conectar com o servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Acessar Conta</h2>

      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          required
        />

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      {mensagem && <p className="login-mensagem">{mensagem}</p>}

      <div className="login-footer">
        <p>Não possui conta? <Link to="/cadastro" className="cadastro-link">Cadastre-se</Link></p>
      </div>
    </div>
  );
}

export default Login;
