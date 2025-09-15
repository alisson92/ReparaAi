<template>
  <div class="login">
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
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

// Variável reativa para guardar o email e a senha digitados
const credentials = ref({
  email: '',
  password: ''
});

// Importamos o router para poder redirecionar o usuário após o login
const router = useRouter();

// Função que é chamada ao enviar o formulário
async function handleLogin() {
  try {
    // 1. Enviamos as credenciais para o nosso endpoint POST /login
    const response = await api.post('/login', credentials.value);
    
    // 2. Pegamos o token que o backend nos enviou
    const token = response.data.token;
    
    // 3. O PASSO MAIS IMPORTANTE: Guardamos o token no Local Storage do navegador.
    // O Local Storage é um "pequeno banco de dados" no navegador que persiste
    // mesmo que o usuário feche a aba ou o navegador.
    localStorage.setItem('authToken', token);

    alert('Login realizado com sucesso!');
    
    // 4. Redirecionamos o usuário para a página inicial
    router.push('/');

  } catch (error) {
    console.error('Erro de login:', error);
    const errorMessage = error.response?.data?.error || 'Não foi possível fazer o login. Verifique suas credenciais.';
    alert(`Erro: ${errorMessage}`);
  }
}
</script>

<style scoped>
/* Podemos reusar os estilos da tela de cadastro */
.login {
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
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
</style>