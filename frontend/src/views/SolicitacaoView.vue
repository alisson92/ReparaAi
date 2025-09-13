<template>
  <div class="solicitacao">
    <h1>Nova Solicitação</h1>
    <p>Descreva o problema que você encontrou na cidade.</p>
    <form @submit.prevent="createTicket">
      <div class="form-group">
        <label for="header">Título da Solicitação</label>
        <input type="text" id="header" v-model="ticketData.header" required placeholder="Ex: Buraco na rua em frente ao número 123">
      </div>
      <div class="form-group">
        <label for="description">Descrição Detalhada</label>
        <textarea id="description" v-model="ticketData.description" required rows="5" placeholder="Forneça mais detalhes sobre o problema..."></textarea>
      </div>

      <div class="map-placeholder">
        Componente do Google Maps para selecionar a localização aparecerá aqui.
        <br> (Por enquanto, usaremos valores fixos para teste)
      </div>

      <button type="submit">Enviar Solicitação</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';

const ticketData = ref({
  header: '',
  description: '',
  // --- DADOS TEMPORÁRIOS PARA TESTE ---
  idUser: 1, // TODO: No futuro, este ID virá do usuário que está logado.
  email: 'teste@email.com', // TODO: Também virá do usuário logado.
  localization: '-21.4056,-48.5147' // TODO: Virá do componente do Google Maps.
});

async function createTicket() {
  try {
    const response = await api.post('/tickets', ticketData.value); // Assumindo que a rota seja '/tickets'
    
    alert('Solicitação enviada com sucesso!');
    console.log('Ticket criado:', response.data);

    // Limpa o formulário
    ticketData.value.header = '';
    ticketData.value.description = '';

  } catch (error) {
    console.error('Erro ao criar a solicitação:', error);
    const errorMessage = error.response?.data?.message || 'Não foi possível enviar a solicitação.';
    alert(`Erro: ${errorMessage}`);
  }
}
</script>

<style scoped>
/* Podemos reusar os mesmos estilos da tela de cadastro */
.solicitacao {
  max-width: 600px;
  margin: 2rem auto;
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
input, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
button {
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  width: 100%;
}
button:hover {
  background-color: #0056b3;
}
.map-placeholder {
  padding: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
  background-color: #f4f4f4;
  border: 2px dashed #ccc;
  border-radius: 4px;
}
</style>