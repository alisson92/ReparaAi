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
       <div class="coords-display">
        <span>Lat: {{ ticketData.localization_lat }}</span>
        <span>Lon: {{ ticketData.localization_lon }}</span>
      </div>


      <button type="submit">Enviar Solicitação</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';
// 2. Importamos os componentes da biblioteca que instalamos
import { GoogleMap, Marker } from 'vue3-google-map';

// 3. Pegamos a chave da API do nosso arquivo .env do frontend
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// 4. Coordenadas de Taquaritinga, SP para centralizar o mapa inicialmente
const mapCenter = { lat: -21.4056, lng: -48.5147 };

// 5. Posição inicial do marcador (pin) no mapa
const markerPosition = ref(mapCenter);

const ticketData = ref({
  header: '',
  description: '',
  idUser: 1, // TODO: Substituir por dados do usuário logado
  email: 'teste@email.com', // TODO: Substituir por dados do usuário logado
  // Inicializamos com as coordenadas do centro do mapa
  localization_lat: mapCenter.lat,
  localization_lon: mapCenter.lng,
});

// 6. Função chamada quando o usuário clica no mapa
function handleMapClick(event) {
  const newCoords = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng()
  };
  
  // Atualiza a posição do marcador na tela
  markerPosition.value = newCoords;

  // Atualiza os dados que serão enviados para a API
  ticketData.value.localization_lat = newCoords.lat;
  ticketData.value.localization_lon = newCoords.lng;
}

async function createTicket() {
  try {
    // O backend espera um campo 'localization' como string 'lat,lon', vamos criar um objeto específico para enviar, combinando os dados.
    const dataToSend = {
      header: ticketData.value.header,
      description: ticketData.value.description,
      idUser: ticketData.value.idUser,
      email: ticketData.value.email,
      localization: `${ticketData.value.localization_lat},${ticketData.value.localization_lon}`
    };

    // Agora o localization_lat e lon são dinâmicos!
    const response = await api.post('/tickets', dataToSend);
    
    alert('Solicitação enviada com sucesso!');
    console.log('Ticket criado:', response.data);

    // Limpa o formulário após o envio
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
/* Estilos anteriores ... */
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
.coords-display {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1.5rem;
  font-family: monospace;
  background-color: #f0f0f0;
  padding: 0.5rem;
  border-radius: 4px;
}
</style>
