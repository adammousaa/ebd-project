import axios from 'axios';

// Create axios instance with default config
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (userData) => API.post('/users/register', userData),
  login: (credentials) => API.post('/users/login', credentials),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Purchase Request API calls
export const purchaseAPI = {
  createPurchaseRequest: (data) => API.post('/purchase-requests', data),
  getMyPurchaseRequests: (params) => API.get('/purchase-requests/my-requests', { params }),
  getAllPurchaseRequests: (params) => API.get('/purchase-requests', { params }),
  getPurchaseRequestById: (id) => API.get(`/purchase-requests/${id}`),
  approvePurchaseRequest: (id) => API.put(`/purchase-requests/${id}/approve`),
  rejectPurchaseRequest: (id, reason) => API.put(`/purchase-requests/${id}/reject`, { reason }),
  cancelPurchaseRequest: (id) => API.put(`/purchase-requests/${id}/cancel`),
  getPurchaseStats: () => API.get('/purchase-requests/stats/overview'),
};

// Farm API calls
export const farmAPI = {
  registerFarm: (data) => API.post('/farms/register', data),
  getFarms: () => API.get('/farms'),
  getFarmById: (id) => API.get(`/farms/${id}`),
  getFarmsNearLocation: (lat, lng, radius) => API.get(`/farms/near/${lat}/${lng}/${radius}`),
};

// Credit API calls
export const creditAPI = {
  generateCredits: (data) => API.post('/credits/generate', data),
  getAllCredits: () => API.get('/credits/all'),
  getCreditById: (id) => API.get(`/credits/${id}`),
  updateCreditStatus: (id, status) => API.put(`/credits/${id}/status`, { status }),
};

// Transaction API calls
export const transactionAPI = {
  getTransactions: () => API.get('/transactions'),
  getTransactionById: (id) => API.get(`/transactions/${id}`),
  createTransaction: (data) => API.post('/transactions', data),
};

// Dashboard API calls
export const dashboardAPI = {
  getDashboardData: () => API.get('/dashboard'),
  getStudentStats: () => API.get('/dashboard/student-stats'),
};

// Recommendation API calls
export const recommendationAPI = {
  getRecommendations: () => API.get('/recommendations'),
  getCourseRecommendations: () => API.get('/recommendations/courses'),
};

export default API;