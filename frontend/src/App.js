// App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Orders from './pages/Orders';
import ShoppingCart from './pages/ShoppingCart';
import EditarProdutos from './pages/EditarProdutos';
import Navbar from './components/Navbar';
import Layout from './pages/Layout';
import FecharPedido from './pages/FecharPedido';
import { AuthProvider } from './components/AuthContext';
import { CartProvider } from './components/CartContext';
import Loader from './components/Loader';
import PrivateRoute from './components/PrivateRoute.jsx'

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400); // duração ajustável
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <Navbar />
      {loading && <Loader />}
      {!loading && (
        <Routes>
            {/* públicas */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/products" element={<Layout><Products /></Layout>} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/cadastro" element={<Layout><SignUp /></Layout>} />

            {/* protegidas – qualquer usuário logado */}
            <Route element={<PrivateRoute />}>
              <Route path="/pedidos" element={<Layout><Orders /></Layout>} />
              <Route path="/carrinho" element={<Layout><ShoppingCart /></Layout>} />
              <Route path="/fechar-pedido" element={<Layout><FecharPedido /></Layout>} />
            </Route>

            {/* protegida – apenas admin */}
            <Route element={<PrivateRoute requiredRole="admin" />}>
              <Route path="/admin/produtos" element={<Layout><EditarProdutos /></Layout>} />
            </Route>
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
