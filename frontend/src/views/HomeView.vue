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
      <RouterLink 
        v-for="ticket in tickets" 
        :key="ticket.idTicket" 
        :to="'/solicitacao/' + ticket.idTicket" 
        class="ticket-link"
      >
        <div class="ticket-card">
          <h2>{{ ticket.header }}</h2>
          <p>{{ ticket.description }}</p>
          <div class="ticket-footer">
            <span>Enviado por: {{ ticket.email }}</span>
            <span>Em: {{ new Date(ticket.createdAt).toLocaleDateString('pt-BR') }}</span>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';

const tickets = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await api.get('/tickets');
    tickets.value = response.data.Tickets;
  } catch (error) {
    console.error("Erro ao buscar os tickets:", error);
  } finally {
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  background-color: white;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.ticket-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.1);
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

/* Adicionamos este estilo para o link não ter decoração (sublinhado, etc.) */
.ticket-link {
  text-decoration: none;
  color: inherit;
}
</style>