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
        <label for="password">Senha</label>
        <input type="password" id="password" v-model="userData.password" required>
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
      
      <hr>
      <h1>Endereço</h1>
      <div class="form-group">
        <label for="cep">CEP</label>
        <input type="text" id="cep" v-model="userData.cep" required>
      </div>
      <div class="form-group">
        <label for="street">Rua</label>
        <input type="text" id="street" v-model="userData.street" required>
      </div>
      <div class="form-group">
        <label for="number">Número</label>
        <input type="text" id="number" v-model="userData.number" required>
      </div>
      <div class="form-group">
        <label for="neighborhood">Bairro</label>
        <input type="text" id="neighborhood" v-model="userData.neighborhood" required>
      </div>
      <div class="form-group">
        <label for="city">Cidade</label>
        <input type="text" id="city" v-model="userData.city" required>
      </div>
      <div class="form-group">
        <label for="state">Estado</label>
        <input type="text" id="state" v-model="userData.state" required>
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';
import { useToast } from 'vue-toastification/dist/index.mjs'; // Importe o useToast

const toast = useToast(); // Inicialize o toast

const userData = ref({
  name: '',
  email: '',
  password: '',
  cpf: '',
  phone: '',
  birthDate: '',
  cep: '',
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  state: ''
});

async function registerUser() {
  try {
    const response = await api.post('/user', userData.value);
    
    // Troque o alert por toast.success
    toast.success('Usuário cadastrado com sucesso!');
    console.log(response.data);

    for (const key in userData.value) {
      userData.value[key] = '';
    }

  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    const errorMessage = error.response?.data?.message || 'Não foi possível completar o cadastro.';
    
    // Troque o alert por toast.error
    toast.error(errorMessage);
  }
}
</script>

<style scoped>
.cadastro-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.cadastro-box {
  width: 100%;
  max-width: 500px;
  padding: 2.5rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  background-color: var(--surface-color);
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
  font-weight: 500;
}
input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;
}
button:hover {
  background-color: var(--primary-color-dark);
}
</style>