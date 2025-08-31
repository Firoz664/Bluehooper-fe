import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children, restricted = false }) => {
  // DEVELOPMENT MODE: Route restrictions are disabled for development
  // Uncomment the code below to enable restrictions in production
  
  /*
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated && restricted ? <Navigate to="/dashboard" replace /> : children;
  */

  return children;
};

export default PublicRoute;