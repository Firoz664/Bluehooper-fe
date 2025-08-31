export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  PROJECTS: {
    BASE: '/projects',
    BY_ID: (id) => `/projects/${id}`,
  },
  TASKS: {
    BY_PROJECT: (projectId) => `/projects/${projectId}/tasks`,
    BY_PROJECT_AND_ID: (projectId, taskId) => `/projects/${projectId}/tasks/${taskId}`,
  },
  USERS: {
    BASE: '/users',
    BY_ID: (id) => `/users/${id}`,
  },
  DOCUMENTS: {
    BY_PROJECT: (projectId) => `/projects/${projectId}/documents`,
    BY_PROJECT_AND_ID: (projectId, docId) => `/projects/${projectId}/documents/${docId}`,
  },
};

export const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROJECTS: '/dashboard/projects',
  TASKS: '/dashboard/tasks',
  USERS: '/dashboard/users',
  DOCUMENTS: '/dashboard/documents',
};

export const USER_ROLES = {
  ADMIN: 'admin',
  PROJECT_MANAGER: 'project_manager',
  ARCHITECT: 'architect',
  ENGINEER: 'engineer',
  SUPERVISOR: 'supervisor',
  WORKER: 'worker',
};

export const PROJECT_STATUS = {
  PLANNING: 'planning',
  IN_PROGRESS: 'in_progress',
  ON_HOLD: 'on_hold',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};