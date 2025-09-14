<template>
  <div class="ticket-details">
    <div v-if="isLoading" class="loading">Carregando detalhes...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="ticket" class="ticket-content">
      <h1>{{ ticket.header }}</h1>
      <p class="description">{{ ticket.description }}</p>

      <div class="meta-data">
        <span><strong>Enviado por:</strong> {{ ticket.email }}</span>
        <span><strong>Em:</strong> {{ new Date(ticket.createdAt).toLocaleString('pt-BR') }}</span>
      </div>

      <div class="map-container">
        <GoogleMap
          :api-key="apiKey"
          style="width: 100%; height: 400px"
          :center="markerPosition"
          :zoom="16"
        >
          <Marker :options="{ position: markerPosition }" />
        </GoogleMap>
      </div>

      <div class="actions">
        <RouterLink :to="`/solicitacao/${ticketId}/edit`">
          <button class="btn-edit">Editar</button>
        </RouterLink>
        <button @click="deleteTicket" class="btn-delete">Excluir Solicitação</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
// 1. IMPORTAMOS O useRouter PARA PODER REDIRECIONAR O USUÁRIO
import { useRoute, useRouter } from 'vue-router';
import api from '../services/api';
import { GoogleMap, Marker } from 'vue3-google-map';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const ticket = ref(null);
const isLoading = ref(true);
const error = ref(null);

const route = useRoute();
const ticketId = route.params.idTicket;

// 2. INICIALIZAMOS O router
const router = useRouter();

const markerPosition = computed(() => {
  if (ticket.value && ticket.value.localization) {
    const [lat, lng] = ticket.value.localization.split(',').map(Number);
    return { lat, lng };
  }
  return { lat: 0, lng: 0 };
});

// 3. FUNÇÃO PARA DELETAR O TICKET
async function deleteTicket() {
  // Uma boa prática é sempre confirmar ações destrutivas
  const confirmation = window.confirm("Tem certeza que deseja excluir esta solicitação? Esta ação não pode ser desfeita.");

  if (confirmation) {
    try {
      await api.delete(`/tickets/${ticketId}`);
      alert('Solicitação excluída com sucesso!');
      // Após excluir, redirecionamos o usuário para a página inicial
      router.push('/');
    } catch (err) {
      console.error("Erro ao excluir o ticket:", err);
      alert("Não foi possível excluir a solicitação.");
    }
  }
}

onMounted(async () => {
  try {
    const response = await api.get(`/tickets/${ticketId}`);
    ticket.value = response.data.Ticket;
  } catch (err) {
    console.error("Erro ao buscar detalhes do ticket:", err);
    error.value = "Não foi possível carregar os detalhes da solicitação.";
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
/* ... (estilos anteriores) ... */

.actions {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end; /* Alinha os botões à direita */
  gap: 1rem; /* Espaçamento entre os botões */
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}

.actions .btn-edit {
  background-color: #ffc107;
  color: #333;
}
.actions .btn-edit:hover {
  background-color: #e0a800;
}

.btn-edit {
  background-color: #ffc107;
  color: #333;
}

.btn-edit:disabled {
  background-color: #e0e0e0;
  cursor: not-allowed;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-delete:hover {
  background-color: #c82333;
}
</style>