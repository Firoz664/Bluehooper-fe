import apiClient from './client';

export const organizationsAPI = {
  // Create new organization
  createOrganization: async (organizationData) => {
    return apiClient.post('/organizations', organizationData);
  },

  // Get organizations
  getOrganizations: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiClient.get(`/organizations${queryString ? `?${queryString}` : ''}`);
  },

  // Get single organization by ID
  getOrganization: async (organizationId) => {
    return apiClient.get(`/organizations/${organizationId}`);
  },

  // Update organization
  updateOrganization: async (organizationId, organizationData) => {
    return apiClient.put(`/organizations/${organizationId}`, organizationData);
  },

  // Delete organization
  deleteOrganization: async (organizationId) => {
    return apiClient.delete(`/organizations/${organizationId}`);
  },

  // Get organization capabilities
  getOrganizationCapabilities: async (organizationId) => {
    return apiClient.get(`/organizations/${organizationId}/capabilities`);
  },

  // Add capability to organization
  addCapability: async (organizationId, capabilityData) => {
    return apiClient.post(`/organizations/${organizationId}/capabilities`, capabilityData);
  },

  // Update organization capability
  updateCapability: async (organizationId, capabilityId, capabilityData) => {
    return apiClient.put(`/organizations/${organizationId}/capabilities/${capabilityId}`, capabilityData);
  },

  // Delete organization capability
  deleteCapability: async (organizationId, capabilityId) => {
    return apiClient.delete(`/organizations/${organizationId}/capabilities/${capabilityId}`);
  },
};