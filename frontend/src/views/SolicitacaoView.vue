<template>
  <div class="solicitacao">
    <h1>Nova Solicitação</h1>
    <p>Descreva o problema e aponte a localização exata no mapa.</p>
    <form @submit.prevent="createTicket">
      <div class="form-group">
        <label for="header">Título da Solicitação</label>
        <input type="text" id="header" v-model="ticketData.header" required placeholder="Ex: Buraco na rua em frente ao número 123">
      </div>
      <div class="form-group">
        <label for="description">Descrição Detalhada</label>
        <textarea id="description" v-model="ticketData.description" required rows="5" placeholder="Forneça mais detalhes sobre o problema..."></textarea>
      </div>
      <div class="form-group">
        <label>Localização (clique no mapa para definir)</label>
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
      <button type="submit">Enviar Solicitação</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';
import { GoogleMap, Marker } from 'vue3-google-map';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Posição inicial do mapa e do marcador
const mapCenter = { lat: -21.4056, lng: -48.5147 }; // Taquaritinga
const markerPosition = ref(mapCenter);

const ticketData = ref({
  header: '',
  description: '',
  idUser: 1, // TODO: Substituir por dados do usuário logado
  email: 'teste@email.com', // TODO: Substituir por dados do usuário logado
});

// Função para atualizar a posição do marcador
function handleMapClick(event) {
  markerPosition.value = { lat: event.latLng.lat(), lng: event.latLng.lng() };
}

async function createTicket() {
  try {
    // Montamos a string de localização a partir da posição do marcador
    const localizationString = `${markerPosition.value.lat},${markerPosition.value.lng}`;

    const dataToSend = {
      ...ticketData.value,
      localization: localizationString
    };
    
    const response = await api.post('/tickets', dataToSend);
    
    alert('Solicitação enviada com sucesso!');
    console.log('Ticket criado:', response.data);

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
/* Estilos existentes */
.solicitacao { max-width: 600px; margin: 2rem auto; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
.form-group { margin-bottom: 1.5rem; }
label { display: block; margin-bottom: 0.5rem; }
input, textarea { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem; }
button { padding: 0.75rem 1.5rem; border: none; background-color: #007bff; color: white; border-radius: 4px; cursor: pointer; font-size: 1rem; width: 100%; margin-top: 1rem; }
button:hover { background-color: #0056b3; }
</style>