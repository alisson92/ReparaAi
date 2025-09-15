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

// Atualizamos o objeto para refletir os novos campos de endereço
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

// A função registerUser continua exatamente a mesma, pois ela já envia o objeto userData.value completo
async function registerUser() {
  try {
    const response = await api.post('/user', userData.value);
    
    alert('Usuário cadastrado com sucesso!');
    console.log(response.data);

    // Limpar o formulário (opcional, pode remover se preferir)
    for (const key in userData.value) {
      userData.value[key] = '';
    }

  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    const errorMessage = error.response?.data?.message || 'Não foi possível completar o cadastro.';
    alert(`Erro: ${errorMessage}`);
  }
}
</script>

<style scoped>
/* Os estilos continuam os mesmos */
.cadastro { max-width: 500px; margin: 2rem auto; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.form-group { margin-bottom: 1rem; }
label { display: block; margin-bottom: 0.5rem; }
input { width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
button { padding: 0.75rem 1.5rem; border: none; background-color: #007bff; color: white; border-radius: 4px; cursor: pointer; font-size: 1rem; width: 100%; margin-top: 1rem;}
button:hover { background-color: #0056b3; }
hr { margin: 2rem 0; border: 0; border-top: 1px solid #eee; }
</style>