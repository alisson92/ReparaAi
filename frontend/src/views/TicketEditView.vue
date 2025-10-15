<template>
  <div class="page page--edit">
    <div class="card">
      <h1 class="card__title">Editar Solicitação</h1>

      <div v-if="isLoading" class="loading">Carregando...</div>

      <form v-else @submit.prevent="updateTicket" class="form">
        <div class="form-group">
          <label for="header">Título da Solicitação</label>
          <input
            type="text"
            id="header"
            v-model="ticketData.header"
            required
            placeholder="Digite o título da solicitação"
          />
        </div>

        <div class="form-group">
          <label for="description">Descrição Detalhada</label>
          <textarea
            id="description"
            v-model="ticketData.description"
            required
            rows="5"
            placeholder="Explique melhor o problema..."
          ></textarea>
        </div>

        <div class="form-group">
          <label>Localização (clique no mapa para alterar)</label>
          <GoogleMap
            :api-key="apiKey"
            style="width: 100%; height: 300px; border-radius: var(--border-radius); overflow: hidden;"
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

        <button type="submit" class="btn btn--primary">
          Salvar Alterações
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'
import { GoogleMap, Marker } from 'vue3-google-map'
import { useToast } from 'vue-toastification/dist/index.mjs'

const toast = useToast()
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const route = useRoute()
const router = useRouter()
const ticketId = route.params.idTicket

const ticketData = ref({
  header: '',
  description: '',
  localization_lat: 0,
  localization_lon: 0,
})

const isLoading = ref(true)
const mapCenter = ref({ lat: 0, lng: 0 })
const markerPosition = ref({ lat: 0, lng: 0 })

onMounted(async () => {
  try {
    const response = await api.get(`/tickets/${ticketId}`)
    const ticket = response.data.Ticket

    ticketData.value.header = ticket.header
    ticketData.value.description = ticket.description

    const [lat, lng] = ticket.localization.split(',').map(Number)
    ticketData.value.localization_lat = lat
    ticketData.value.localization_lon = lng

    mapCenter.value = { lat, lng }
    markerPosition.value = { lat, lng }
  } catch (error) {
    console.error('Erro ao buscar dados do ticket para edição:', error)
    toast.error('Não foi possível carregar os dados para edição.')
  } finally {
    isLoading.value = false
  }
})

function handleMapClick(event) {
  const newCoords = { lat: event.latLng.lat(), lng: event.latLng.lng() }
  markerPosition.value = newCoords
  ticketData.value.localization_lat = newCoords.lat
  ticketData.value.localization_lon = newCoords.lng
}

async function updateTicket() {
  try {
    const dataToSend = {
      header: ticketData.value.header,
      description: ticketData.value.description,
      localization: `${ticketData.value.localization_lat},${ticketData.value.localization_lon}`,
    }

    await api.put(`/tickets/${ticketId}`, dataToSend)
    toast.success('Solicitação atualizada com sucesso!')
    router.push(`/solicitacao/${ticketId}`)
  } catch (error) {
    console.error('Erro ao atualizar a solicitação:', error)
    toast.error('Não foi possível salvar as alterações.')
  }
}
</script>

<style scoped>
.page {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 2rem;
  background: var(--background-color);
}

.card {
  width: 100%;
  max-width: 720px;
  background: var(--surface-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
}

.card__title {
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-color);
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  background: var(--surface-color);
  transition: border-color 0.2s, box-shadow 0.2s;
}

input:focus,
textarea:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--focus-ring);
  outline: none;
}

.coords-display {
  display: flex;
  justify-content: space-around;
  margin: 1rem 0 1.5rem;
  font-family: monospace;
  background: var(--background-color);
  padding: 0.5rem;
  border-radius: var(--border-radius);
  color: var(--text-color-secondary);
}

.btn {
  padding: 0.85rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  font-size: 1rem;
}

/* Alterado: agora o botão usa o azul padrão */
.btn--primary {
  background: var(--primary-color);
  color: #fff;
}
.btn--primary:hover {
  filter: brightness(1.1);
}
</style>