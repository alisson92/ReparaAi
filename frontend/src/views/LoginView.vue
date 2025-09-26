<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Acessar o Sistema</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="credentials.email" required>
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input type="password" id="password" v-model="credentials.password" required>
        </div>
        <button type="submit">Entrar</button>
      </form>
      
      <div class="register-link">
        <p>Não tem uma conta? <RouterLink to="/cadastro">Cadastre-se</RouterLink></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import api from '../services/api';
// A importação correta para o 'useToast' também deve ser explícita
import { useToast } from 'vue-toastification/dist/index.mjs';

const credentials = ref({
  email: '',
  password: ''
});

const router = useRouter();
const toast = useToast();

async function handleLogin() {
  try {
    const response = await api.post('/login', credentials.value);
    const token = response.data.token;
    localStorage.setItem('authToken', token);

    toast.success('Login realizado com sucesso!');
    router.push('/');

  } catch (error) {
    console.error('Erro de login:', error);
    const errorMessage = error.response?.data?.error || 'Não foi possível fazer o login.';
    toast.error(errorMessage);
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh; /* Centraliza verticalmente na tela */
}
.login-box {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  background-color: white;
}
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: #28a745;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
button:hover {
  background-color: #218838;
}

/* Estilo para o novo link de cadastro */
.register-link {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
  color: #555;
}
.register-link a {
  color: #007bff;
  font-weight: bold;
  text-decoration: none;
}
.register-link a:hover {
  text-decoration: underline;
}
</style>