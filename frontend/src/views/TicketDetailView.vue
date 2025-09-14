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

      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api';
import { GoogleMap, Marker } from 'vue3-google-map';

// Pega a chave da API do ambiente
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Variáveis de estado para guardar os dados, status de carregamento e erros
const ticket = ref(null);
const isLoading = ref(true);
const error = ref(null);

// O 'useRoute' nos dá acesso às informações da rota atual, incluindo os parâmetros
const route = useRoute();
const ticketId = route.params.idTicket;

// Propriedade computada para extrair e formatar a posição do marcador
const markerPosition = computed(() => {
  if (ticket.value && ticket.value.localization) {
    const [lat, lng] = ticket.value.localization.split(',').map(Number);
    return { lat, lng };
  }
  return { lat: 0, lng: 0 }; // Posição padrão caso algo dê errado
});


// Quando o componente é montado, buscamos os detalhes do ticket
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
.ticket-details {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.ticket-content h1 {
  margin-top: 0;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
}

.meta-data {
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
  padding: 1rem 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  color: #666;
}

.map-container {
  margin-top: 2rem;
  border-radius: 8px;
  overflow: hidden; /* Garante que o mapa fique com as bordas arredondadas */
}

.loading, .error {
  text-align: center;
  font-size: 1.2rem;
  padding: 3rem;
}
</style>