import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

// INÍCIO DA MUDANÇA: Interceptor de Requisição
// Esta função será executada ANTES de TODA requisição que fizermos com o 'api'
api.interceptors.request.use(async (config) => {
  // 1. Tenta pegar o token que guardamos no localStorage
  const token = localStorage.getItem('authToken');

  // 2. Se o token existir, ele o adiciona no cabeçalho (header) de Autorização
  if (token) {
    // O formato 'Bearer [token]' é um padrão de mercado
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 3. Retorna a configuração modificada para o axios continuar a requisição
  return config;
}, (error) => {
  // Faz algo com o erro da requisição
  return Promise.reject(error);
});
// FIM DA MUDANÇA

export default api;