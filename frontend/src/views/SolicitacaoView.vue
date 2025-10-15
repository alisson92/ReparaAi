<template>
  <div class="page page--form">
    <div class="card">
      <header class="card__header">
        <h1 class="card__title">Nova Solicitação</h1>
        <p class="card__subtitle">Descreva o problema e aponte a localização exata no mapa 📍</p>
      </header>

      <form class="form" @submit.prevent="createTicket">
        <!-- Título -->
        <div class="form__field form__field--full">
          <label for="header">Título da Solicitação *</label>
          <input 
            id="header"
            type="text"
            v-model="ticketData.header"
            required
            placeholder="Ex: Buraco na rua em frente ao número 123"
            :class="{ invalid: errors.header }"
            @blur="validateField('header')"
          />
          <small v-if="errors.header" class="error">{{ errors.header }}</small>
        </div>

        <!-- Descrição -->
        <div class="form__field form__field--full">
          <label for="description">Descrição Detalhada *</label>
          <textarea 
            id="description"
            v-model="ticketData.description"
            required
            rows="5"
            placeholder="Forneça mais detalhes sobre o problema..."
            :class="{ invalid: errors.description }"
            @blur="validateField('description')"
          ></textarea>
          <small v-if="errors.description" class="error">{{ errors.description }}</small>
        </div>

        <!-- Mapa -->
        <div class="form__field form__field--full">
          <label>Localização (clique no mapa para definir)</label>
          <div class="map-wrapper">
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
        </div>

        <!-- Botão -->
        <div class="form__actions">
          <button type="submit" class="btn btn--primary">Enviar Solicitação</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'
import { GoogleMap, Marker } from 'vue3-google-map'
import { useToast } from 'vue-toastification/dist/index.mjs'

const toast = useToast()
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const mapCenter = { lat: -21.4056, lng: -48.5147 }
const markerPosition = ref(mapCenter)

const ticketData = ref({
  header: '',
  description: '',
})

const errors = ref({})

function validateField(field) {
  if (!ticketData.value[field]) {
    errors.value[field] = 'Campo obrigatório'
  } else {
    errors.value[field] = ''
  }
}

function handleMapClick(event) {
  markerPosition.value = { lat: event.latLng.lat(), lng: event.latLng.lng() }
}

async function createTicket() {
  try {
    const dataToSend = {
      header: ticketData.value.header,
      description: ticketData.value.description,
      localization: `${markerPosition.value.lat},${markerPosition.value.lng}`
    }
    const response = await api.post('/tickets', dataToSend)

    toast.success('Solicitação enviada com sucesso!')
    console.log('Ticket criado:', response.data)

    ticketData.value.header = ''
    ticketData.value.description = ''
    errors.value = {}
  } catch (error) {
    console.error('Erro ao criar a solicitação:', error)
    const errorMessage = error.response?.data?.message || 'Não foi possível enviar a solicitação.'
    toast.error(errorMessage)
  }
}
</script>

<style scoped>
.page {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  background: var(--background-color);
  padding: 2rem;
}

.card {
  width: 100%;
  max-width: 780px;
  background: var(--surface-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
}

.card__header { margin-bottom: 1.25rem; }
.card__title {
  margin: 0 0 .25rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
}
.card__subtitle {
  margin: 0;
  color: var(--text-color-secondary);
}

/* Form */
.form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.form__field {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
label {
  font-weight: 600;
  color: var(--text-color);
}
input, textarea {
  padding: .75rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: #fff;
  font-size: 1rem;
  color: var(--text-color);
  transition: border-color .2s, box-shadow .2s;
}
input::placeholder, textarea::placeholder {
  color: var(--text-color-secondary);
}
input:focus, textarea:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--focus-ring);
  outline: none;
}

/* Map */
.map-wrapper {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);
}

/* Botão */
.form__actions { margin-top: .5rem; }
.btn {
  width: 100%;
  height: 48px;
  padding: 0 1.25rem;
  border: 0;
  border-radius: var(--border-radius);
  font-weight: 700;
  cursor: pointer;
  transition: transform .05s ease, filter .2s;
}
.btn--primary {
  background: var(--primary-color);
  color: #fff;
}
.btn--primary:hover { filter: brightness(1.05); }
.btn--primary:active { transform: translateY(1px); }

/* Feedback de erro */
input.invalid, textarea.invalid {
  border-color: #dc3545;
  background: #fff5f5;
}
.error {
  color: #dc3545;
  font-size: 0.85rem;
}

/* Responsivo */
@media (max-width: 820px) {
  .card { padding: 1.25rem; }
}
</style>
