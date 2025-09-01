import apiClient from './client';

export const projectsAPI = {
  // Get all projects
  getProjects: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient.get(`/projects${queryString ? `?${queryString}` : ''}`);
  },

  // Get single project by ID
  getProject: async (projectId) => {
    return apiClient.get(`/projects/${projectId}`);
  },

  // Create new project
  createProject: async (projectData) => {
    return apiClient.post('/projects', projectData);
  },

  // Update project
  updateProject: async (projectId, projectData) => {
    return apiClient.put(`/projects/${projectId}`, projectData);
  },

  // Delete project
  deleteProject: async (projectId) => {
    return apiClient.delete(`/projects/${projectId}`);
  },

  // Assign user to project
  assignUserToProject: async (projectId, userData) => {
    return apiClient.post(`/projects/${projectId}/users`, userData);
  },

  // Remove user from project
  removeUserFromProject: async (projectId, userId) => {
    return apiClient.delete(`/projects/${projectId}/users/${userId}`);
  },

  // Get project users
  getProjectUsers: async (projectId) => {
    return apiClient.get(`/projects/${projectId}/users`);
  },

  // Update project status
  updateProjectStatus: async (projectId, status) => {
    return apiClient.patch(`/projects/${projectId}/status`, { status });
  },
};