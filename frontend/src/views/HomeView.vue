<template>
  <div class="home">
    <h1>Solicitações Abertas</h1>

    <div v-if="isLoading" class="loading">
      Carregando solicitações...
    </div>

    <div v-else-if="tickets.length === 0" class="empty-state">
      Nenhuma solicitação encontrada. Seja o primeiro a criar uma!
    </div>

    <div v-else class="tickets-list">
      <div v-for="ticket in tickets" :key="ticket.idTicket" class="ticket-card">
        <h2>{{ ticket.header }}</h2>
        <p>{{ ticket.description }}</p>
        <div class="ticket-footer">
          <span>Enviado por: {{ ticket.email }}</span>
          <span>Em: {{ new Date(ticket.createdAt).toLocaleDateString('pt-BR') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 4. Importamos 'ref' para criar variáveis reativas e 'onMounted' para executar código quando o componente é montado
import { ref, onMounted } from 'vue';
import api from '../services/api';

// 5. Criamos nossas variáveis de estado
const tickets = ref([]); // Uma lista vazia que vai guardar os tickets da API
const isLoading = ref(true); // Começa como 'true' para mostrar a mensagem de carregamento

// 6. 'onMounted' é uma função do Vue que roda automaticamente uma vez,
//    assim que o componente é criado e exibido na tela. É o lugar perfeito
//    para buscar dados iniciais.
onMounted(async () => {
  try {
    // Busca os dados na nossa API
    const response = await api.get('/tickets');
    // Preenche nossa variável 'tickets' com a resposta
    tickets.value = response.data.Tickets;
  } catch (error) {
    console.error("Erro ao buscar os tickets:", error);
    // Poderíamos adicionar uma mensagem de erro na tela aqui também
  } finally {
    // 7. Aconteça o que acontecer (sucesso ou erro), paramos de carregar
    isLoading.value = false;
  }
});
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.loading, .empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.tickets-list {
  display: grid;
  gap: 1.5rem;
}

.ticket-card {
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  background-color: white;
}

.ticket-card h2 {
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.ticket-card p {
  color: #555;
}

.ticket-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #888;
}
</style>