<template>
  <div class="cadastro">
    <h1>Cadastro de Usuário</h1>
    <form @submit.prevent="registerUser">
      <div class="form-group">
        <label for="name">Nome Completo</label>
        <input type="text" id="name" v-model="userData.name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="userData.email" required>
      </div>
      <div class="form-group">
        <label for="cpf">CPF</label>
        <input type="text" id="cpf" v-model="userData.cpf" required>
      </div>
      <div class="form-group">
        <label for="phone">Telefone</label>
        <input type="tel" id="phone" v-model="userData.phone" required>
      </div>
      <div class="form-group">
        <label for="birthDate">Data de Nascimento</label>
        <input type="date" id="birthDate" v-model="userData.birthDate" required>
      </div>
       <div class="form-group">
        <label for="lat">Latitude</label>
        <input type="number" step="any" id="lat" v-model="userData.localization_lat" required>
      </div>
      <div class="form-group">
        <label for="lon">Longitude</label>
        <input type="number" step="any" id="lon" v-model="userData.localization_lon" required>
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api'; // Nosso arquivo de configuração do axios

// 'ref' cria um objeto reativo para guardar os dados do formulário
const userData = ref({
  name: '',
  email: '',
  cpf: '',
  phone: '',
  birthDate: '',
  localization_lat: '',
  localization_lon: ''
});

// Função que será chamada ao enviar o formulário
async function registerUser() {
  try {
    // Usamos o 'api.post' para enviar os dados para o endpoint /user
    const response = await api.post('/user', userData.value);
    
    alert('Usuário cadastrado com sucesso!');
    console.log(response.data); // Mostra a resposta da API no console

    // Opcional: Limpar o formulário após o sucesso
    userData.value = {
      name: '', email: '', cpf: '', phone: '',
      birthDate: '', localization_lat: '', localization_lon: ''
    };

  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    // Tenta pegar uma mensagem de erro mais específica da API
    const errorMessage = error.response?.data?.message || 'Não foi possível completar o cadastro.';
    alert(`Erro: ${errorMessage}`);
  }
}
</script>

<style scoped>
.cadastro {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
button:hover {
  background-color: #0056b3;
}
</style>
