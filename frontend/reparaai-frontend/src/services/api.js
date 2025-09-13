import axios from 'axios';

// Cria uma instância do axios com a URL base da nossa API backend
const api = axios.create({
  baseURL: 'http://localhost:3000', // A porta do seu backend
});

export default api;
