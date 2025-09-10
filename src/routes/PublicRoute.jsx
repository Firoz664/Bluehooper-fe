import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, restricted = false }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  // Only skip authentication in development mode with explicit env var
  const isDevelopment = import.meta.env.DEV && import.meta.env.VITE_SKIP_AUTH === 'true';
  
  if (!isDevelopment && isAuthenticated && restricted) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;