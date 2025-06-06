// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Orders from './pages/Orders';
import ShoppingCart from './pages/ShoppingCart';
import EditarProdutos from './pages/EditarProdutos';
import Navbar from './components/Navbar';
import Layout from './pages/Layout';
import FecharPedido from './pages/FecharPedido'
import { AuthProvider } from './components/AuthContext';
import { CartProvider } from './components/CartContext';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/products" element={<Layout><Products /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/cadastro" element={<Layout><SignUp /></Layout>} />
            <Route path="/pedidos" element={<Layout><Orders /></Layout>} />
            <Route path="/carrinho" element={<Layout><ShoppingCart /></Layout>} />
            <Route path="/fechar-pedido" element ={<Layout><FecharPedido /></Layout>} />
            <Route path="/admin/produtos" element= {<Layout><EditarProdutos /></Layout>} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
