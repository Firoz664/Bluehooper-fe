import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { googleAuth } from '../store/slices/authSlice';
import { authAPI } from '../api/auth';

const useGoogleOAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const initiateGoogleLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get auth URL from backend
      const response = await authAPI.getGoogleAuthURL();
      const { auth_url, state } = response.data.data;

      // Store state in sessionStorage for verification
      sessionStorage.setItem('google_oauth_state', state);

      // Redirect to Google OAuth
      window.location.href = auth_url;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to initiate Google login');
      setIsLoading(false);
    }
  }, []);

  const handleGoogleCallback = useCallback(async (code, state) => {
    try {
      setIsLoading(true);
      setError(null);

      // Verify state parameter
      const storedState = sessionStorage.getItem('google_oauth_state');
      if (!storedState || storedState !== state) {
        throw new Error('Invalid state parameter');
      }

      // Clear stored state
      sessionStorage.removeItem('google_oauth_state');

      // Complete Google OAuth flow
      await dispatch(googleAuth({ code, state })).unwrap();
      
      // Navigate to intended destination
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Google authentication failed');
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, navigate, from]);

  return {
    initiateGoogleLogin,
    handleGoogleCallback,
    isLoading,
    error,
    setError
  };
};

export default useGoogleOAuth;