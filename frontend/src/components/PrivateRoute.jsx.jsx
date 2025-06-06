import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

function PrivateRoute({ requiredRole }) {
  const { isAuthenticated, user, isLoading } = useAuth();

  // ⏳ Enquanto o contexto carrega, não faz nada
  if (isLoading) return null;          // ou <Loader />

  // 🔒 Não logado
  if (!isAuthenticated) {
    alert('Você precisa estar logado para acessar esta rota.');
    return <Navigate to="/login" replace />;
  }

  // 🔑 Logado, mas não tem permissão
  if (requiredRole && user?.role !== requiredRole) {
    alert('Apenas usuários com permissão de administrador podem acessar esta página.');
    return <Navigate to="/" replace />;
  }

  // ✅ Tudo certo
  return <Outlet />;
}

export default PrivateRoute;
