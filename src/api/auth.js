import apiClient from './client';

export const authAPI = {
  login: async ({ email, password }) => {
    return apiClient.post('/auth/login', { email, password });
  },

  register: async (userData) => {
    return apiClient.post('/auth/register', userData);
  },

  logout: async () => {
    return apiClient.post('/auth/logout');
  },

  refreshToken: async ({ refreshToken }) => {
    return apiClient.post('/auth/refresh', { refreshToken });
  },

  getProfile: async () => {
    return apiClient.get('/auth/profile');
  },

  updateProfile: async (profileData) => {
    return apiClient.put('/auth/profile', profileData);
  },

  forgotPassword: async ({ email }) => {
    return apiClient.post('/auth/forgot-password', { email });
  },

  resetPassword: async ({ token, password }) => {
    return apiClient.post('/auth/reset-password', { token, password });
  },

  getGoogleAuthURL: async () => {
    return apiClient.get('/auth/google/url');
  },

  googleCallback: async ({ code, state }) => {
    return apiClient.post('/auth/google/callback', { code, state });
  },
};