import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000'
});

// Ajouter un intercepteur pour inclure le jeton d'authentification dans les en-têtes des requêtes
api.interceptors.request.use(
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

export default api;
