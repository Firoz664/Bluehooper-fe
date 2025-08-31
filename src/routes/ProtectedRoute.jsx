import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // DEVELOPMENT MODE: Route protection is disabled for development
  // Uncomment the code below to enable authentication checks in production
  
  /*
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  */

  return children;
};

export default ProtectedRoute;