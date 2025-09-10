import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user, accessToken, isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

  return {
    user,
    token: accessToken,
    accessToken,
    isAuthenticated,
    isLoading,
    error,
  };
};

export default useAuth;