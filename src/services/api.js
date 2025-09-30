import axios from 'axios';

// ✅ Use Vite environment variable
const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${BASE_URL}/token/refresh/`, {
            refresh: refreshToken
          });
          
          const newAccessToken = response.data.access;
          localStorage.setItem('accessToken', newAccessToken);
          api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh token failed, logout user
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// API endpoints
export const jobAPI = {
  // Get all jobs
  getAllJobs: () => api.get('/jobs/'),
  
  // Get job by ID
  getJobById: (id) => api.get(`/jobs/${id}/`),
  
  // Search jobs
  searchJobs: (params) => api.get('/jobs/search/', { params }),
  
  // Create job (authenticated)
  createJob: (data) => api.post('/jobs/', data),
  
  // Update job (authenticated)
  updateJob: (id, data) => api.put(`/jobs/${id}/`, data),
  
  // Delete job (authenticated)
  deleteJob: (id) => api.delete(`/jobs/${id}/`),
};

export const categoryAPI = {
  getAllCategories: () => api.get('/categories/'),
  getCategoryById: (id) => api.get(`/categories/${id}/`),
};

export const locationAPI = {
  getAllLocations: () => api.get('/locations/'),
  getLocationById: (id) => api.get(`/locations/${id}/`),
};

export const employmentTypeAPI = {
  getAllEmploymentTypes: () => api.get('/jobs/employment_types/'),
  getEmploymentTypeById: (id) => api.get(`/jobs/employment_types/${id}/`),
};

export const workModeAPI = {
  getAllWorkModes: () => api.get('/jobs/work_modes/'),
  getWorkModeById: (id) => api.get(`/jobs/work_modes/${id}/`),
};

export const experienceLevelAPI = {
getAllExperienceLevels: () => api.get('/jobs/experience_level/'),
  getExperienceLevelById: (id) => api.get(`/jobs/experience_level/${id}/`),
};

// Add to your existing api.js file
export const applicantProfileAPI = {
  // Get all applicant profiles (for the current user)
  getUserProfile: () => api.get('/usersapplicant-profiles/'),
  
  // Get applicant profile by ID
  getProfileById: (id) => api.get(`/usersapplicant-profiles/${id}/`),
  
  // Create new applicant profile
  createProfile: (data) => api.post('/usersapplicant-profiles/', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  
  // Update existing applicant profile
  updateProfile: (id, data) => api.put(`/usersapplicant-profiles/${id}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  
  // Partial update applicant profile
  patchProfile: (id, data) => api.patch(`/usersapplicant-profiles/${id}/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export default api;