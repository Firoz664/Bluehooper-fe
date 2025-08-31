import { authAPI } from './auth';

export const projectsAPI = {
  getProjects: async () => {
    const { default: apiClient } = await import('./client');
    return apiClient.get('/projects');
  },

  getProject: async (id) => {
    const { default: apiClient } = await import('./client');
    return apiClient.get(`/projects/${id}`);
  },

  createProject: async (projectData) => {
    const { default: apiClient } = await import('./client');
    return apiClient.post('/projects', projectData);
  },

  updateProject: async (id, projectData) => {
    const { default: apiClient } = await import('./client');
    return apiClient.put(`/projects/${id}`, projectData);
  },

  deleteProject: async (id) => {
    const { default: apiClient } = await import('./client');
    return apiClient.delete(`/projects/${id}`);
  },
};

export const tasksAPI = {
  getTasks: async (projectId) => {
    const { default: apiClient } = await import('./client');
    return apiClient.get(`/projects/${projectId}/tasks`);
  },

  getTask: async (projectId, taskId) => {
    const { default: apiClient } = await import('./client');
    return apiClient.get(`/projects/${projectId}/tasks/${taskId}`);
  },

  createTask: async (projectId, taskData) => {
    const { default: apiClient } = await import('./client');
    return apiClient.post(`/projects/${projectId}/tasks`, taskData);
  },

  updateTask: async (projectId, taskId, taskData) => {
    const { default: apiClient } = await import('./client');
    return apiClient.put(`/projects/${projectId}/tasks/${taskId}`, taskData);
  },

  deleteTask: async (projectId, taskId) => {
    const { default: apiClient } = await import('./client');
    return apiClient.delete(`/projects/${projectId}/tasks/${taskId}`);
  },
};

export const usersAPI = {
  getUsers: async () => {
    const { default: apiClient } = await import('./client');
    return apiClient.get('/users');
  },

  getUser: async (id) => {
    const { default: apiClient } = await import('./client');
    return apiClient.get(`/users/${id}`);
  },

  updateUser: async (id, userData) => {
    const { default: apiClient } = await import('./client');
    return apiClient.put(`/users/${id}`, userData);
  },

  deleteUser: async (id) => {
    const { default: apiClient } = await import('./client');
    return apiClient.delete(`/users/${id}`);
  },
};

export const documentsAPI = {
  getDocuments: async (projectId) => {
    const { default: apiClient } = await import('./client');
    return apiClient.get(`/projects/${projectId}/documents`);
  },

  uploadDocument: async (projectId, file) => {
    const { default: apiClient } = await import('./client');
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post(`/projects/${projectId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  deleteDocument: async (projectId, documentId) => {
    const { default: apiClient } = await import('./client');
    return apiClient.delete(`/projects/${projectId}/documents/${documentId}`);
  },
};

export { authAPI };