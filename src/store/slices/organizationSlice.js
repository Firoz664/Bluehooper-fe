import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { organizationsAPI } from '../../api/organizations';

const initialState = {
  organizations: [],
  currentOrganization: null,
  isLoading: false,
  error: null,
  registrationData: {
    userData: null,
    organizationData: null,
    currentStep: 1
  }
};

// Async thunks
export const createOrganization = createAsyncThunk(
  'organizations/createOrganization',
  async (organizationData, { rejectWithValue }) => {
    try {
      const response = await organizationsAPI.createOrganization(organizationData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create organization');
    }
  }
);

export const fetchOrganizations = createAsyncThunk(
  'organizations/fetchOrganizations',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await organizationsAPI.getOrganizations(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch organizations');
    }
  }
);

export const fetchOrganization = createAsyncThunk(
  'organizations/fetchOrganization',
  async (organizationId, { rejectWithValue }) => {
    try {
      const response = await organizationsAPI.getOrganization(organizationId);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch organization');
    }
  }
);

export const updateOrganization = createAsyncThunk(
  'organizations/updateOrganization',
  async ({ organizationId, organizationData }, { rejectWithValue }) => {
    try {
      const response = await organizationsAPI.updateOrganization(organizationId, organizationData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update organization');
    }
  }
);

export const deleteOrganization = createAsyncThunk(
  'organizations/deleteOrganization',
  async (organizationId, { rejectWithValue }) => {
    try {
      await organizationsAPI.deleteOrganization(organizationId);
      return organizationId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete organization');
    }
  }
);

const organizationSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentOrganization: (state) => {
      state.currentOrganization = null;
    },
    setRegistrationUserData: (state, action) => {
      state.registrationData.userData = action.payload;
    },
    setRegistrationOrganizationData: (state, action) => {
      state.registrationData.organizationData = action.payload;
    },
    setRegistrationStep: (state, action) => {
      state.registrationData.currentStep = action.payload;
    },
    resetRegistrationData: (state) => {
      state.registrationData = {
        userData: null,
        organizationData: null,
        currentStep: 1
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Create organization
      .addCase(createOrganization.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.organizations.unshift(action.payload);
        state.currentOrganization = action.payload;
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch organizations
      .addCase(fetchOrganizations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.organizations = action.payload.data || action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch single organization
      .addCase(fetchOrganization.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrganization.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrganization = action.payload;
      })
      .addCase(fetchOrganization.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update organization
      .addCase(updateOrganization.fulfilled, (state, action) => {
        const index = state.organizations.findIndex(org => org.id === action.payload.id);
        if (index !== -1) {
          state.organizations[index] = action.payload;
        }
        if (state.currentOrganization?.id === action.payload.id) {
          state.currentOrganization = action.payload;
        }
      })
      // Delete organization
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.organizations = state.organizations.filter(org => org.id !== action.payload);
        if (state.currentOrganization?.id === action.payload) {
          state.currentOrganization = null;
        }
      });
  },
});

export const { 
  clearError, 
  clearCurrentOrganization,
  setRegistrationUserData,
  setRegistrationOrganizationData,
  setRegistrationStep,
  resetRegistrationData
} = organizationSlice.actions;

export default organizationSlice.reducer;