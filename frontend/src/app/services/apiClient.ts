import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:8080', 
  timeout: 10000,
});

export default apiClient;
