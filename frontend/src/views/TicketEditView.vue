<template>
  <div class="ticket-edit">
    <h1>Editar Solicitação</h1>

    <div v-if="isLoading">Carregando...</div>
    <form v-else @submit.prevent="updateTicket">
      <div class="form-group">
        <label for="header">Título da Solicitação</label>
        <input type="text" id="header" v-model="ticketData.header" required>
      </div>
      <div class="form-group">
        <label for="description">Descrição Detalhada</label>
        <textarea id="description" v-model="ticketData.description" required rows="5"></textarea>
      </div>
      
      <div class="form-group">
        <label>Localização (clique no mapa para alterar)</label>
        <GoogleMap
          :api-key="apiKey"
          style="width: 100%; height: 300px"
          :center="mapCenter"
          :zoom="15"
          @click="handleMapClick"
        >
          <Marker :options="{ position: markerPosition }" />
        </GoogleMap>
      </div>
      <div class="coords-display">
        <span>Lat: {{ ticketData.localization_lat }}</span>
        <span>Lon: {{ ticketData.localization_lon }}</span>
      </div>

      <button type="submit">Salvar Alterações</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../services/api';
import { GoogleMap, Marker } from 'vue3-google-map';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const route = useRoute();
const router = useRouter();
const ticketId = route.params.idTicket;

const ticketData = ref({
  header: '',
  description: '',
  localization_lat: 0,
  localization_lon: 0,
});

const isLoading = ref(true);
const mapCenter = ref({ lat: 0, lng: 0 });
const markerPosition = ref({ lat: 0, lng: 0 });

// Função para buscar os dados do ticket e preencher o formulário
onMounted(async () => {
  try {
    const response = await api.get(`/tickets/${ticketId}`);
    const ticket = response.data.Ticket;
    
    // Preenche os campos do formulário com os dados existentes
    ticketData.value.header = ticket.header;
    ticketData.value.description = ticket.description;

    // Extrai as coordenadas para o mapa
    const [lat, lng] = ticket.localization.split(',').map(Number);
    ticketData.value.localization_lat = lat;
    ticketData.value.localization_lon = lng;
    
    // Centraliza o mapa e o marcador na localização atual do ticket
    mapCenter.value = { lat, lng };
    markerPosition.value = { lat, lng };

  } catch (error) {
    console.error("Erro ao buscar dados do ticket para edição:", error);
    alert("Não foi possível carregar os dados para edição.");
  } finally {
    isLoading.value = false;
  }
});

function handleMapClick(event) {
  const newCoords = { lat: event.latLng.lat(), lng: event.latLng.lng() };
  markerPosition.value = newCoords;
  ticketData.value.localization_lat = newCoords.lat;
  ticketData.value.localization_lon = newCoords.lng;
}

// Função para enviar os dados atualizados para a API
async function updateTicket() {
  try {
    const dataToSend = {
      header: ticketData.value.header,
      description: ticketData.value.description,
      localization: `${ticketData.value.localization_lat},${ticketData.value.localization_lon}`
      // O backend já sabe qual idUser e email estão associados a este ticket
    };
    
    await api.put(`/tickets/${ticketId}`, dataToSend);
    
    alert('Solicitação atualizada com sucesso!');
    // Redireciona de volta para a página de detalhes
    router.push(`/solicitacao/${ticketId}`);

  } catch (error) {
    console.error('Erro ao atualizar a solicitação:', error);
    alert('Não foi possível salvar as alterações.');
  }
}
</script>

<style scoped>
/* Podemos reusar os estilos das outras telas */
.ticket-edit { max-width: 600px; margin: 2rem auto; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.form-group { margin-bottom: 1.5rem; }
label { display: block; margin-bottom: 0.5rem; }
input, textarea { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem; }
button { padding: 0.75rem 1.5rem; border: none; background-color: #28a745; color: white; border-radius: 4px; cursor: pointer; font-size: 1rem; width: 100%; }
button:hover { background-color: #218838; }
.coords-display { display: flex; justify-content: space-around; margin-bottom: 1.5rem; font-family: monospace; background-color: #f0f0f0; padding: 0.5rem; border-radius: 4px; }
</style>