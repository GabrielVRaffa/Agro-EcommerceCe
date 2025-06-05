import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // CSS separado opcional
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async e => {
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
      <h2>Login</h2>

      <form onSubmit={handleLogin} className="login-form">
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
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      {mensagem && <p className="login-mensagem" style={{color: 'black'}}>{mensagem}</p>}
    </div>
  );
}

export default Login;