import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Payables from './pages/Payables';
import Receivables from './pages/Receivables';
import Products from './pages/Products';
import Counterparts from './pages/Counterparts';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="payables/*" element={<Payables />} />
        <Route path="receivables/*" element={<Receivables />} />
        <Route path="products/*" element={<Products />} />
        <Route path="counterparts/*" element={<Counterparts />} />
      </Route>
    </Routes>
  );
}