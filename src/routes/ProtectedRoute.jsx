import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  // Only skip authentication in development mode with explicit env var
  const isDevelopment = import.meta.env.DEV && import.meta.env.VITE_SKIP_AUTH === 'true';
  
  if (!isDevelopment && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;