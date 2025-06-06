import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import saboresdaroca from '../assets/saboresdaroca.png';
import { useAuth } from './AuthContext';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={saboresdaroca} alt="Logo Sabores da Roça" className="navbar-logo-img" />
        </Link>
      </div>

      <ul className="navbar-links">
        {isAuthenticated ? (
          isAdmin ? (
            <>
              <li><Link to="/admin/produtos">Editar Produtos</Link></li>
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Produtos</Link></li>
              <li><Link to="/carrinho">Carrinho</Link></li>
              <li><Link to="/pedidos">Pedidos</Link></li>
              <li><button onClick={handleLogout} className="logout-button">Logout</button></li>
            </>
          )
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/cadastro">Cadastro</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
