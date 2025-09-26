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
        <GoogleMap :api-key="apiKey" style="width: 100%; height: 400px" :center="markerPosition" :zoom="16">
          <Marker :options="{ position: markerPosition }" />
        </GoogleMap>
      </div>
      <div class="actions">
        <RouterLink :to="`/solicitacao/${ticketId}/edit`">
          <button class="btn-edit">Editar</button>
        </RouterLink>
        <button @click="openConfirmationModal" class="btn-delete">Excluir Solicitação</button>
      </div>
    </div>

    <div v-if="isModalVisible" class="modal-overlay">
      <div class="modal-content">
        <h3>Confirmar Exclusão</h3>
        <p>Tem certeza que deseja excluir esta solicitação? Esta ação não pode ser desfeita.</p>
        <div class="modal-actions">
          <button @click="closeModal" class="btn-secondary">Cancelar</button>
          <button @click="deleteTicket" class="btn-delete">Sim, Excluir</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter, RouterLink } from 'vue-router';
import api from '../services/api';
import { GoogleMap, Marker } from 'vue3-google-map';
import { useToast } from 'vue-toastification/dist/index.mjs';

const toast = useToast();
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const ticket = ref(null);
const isLoading = ref(true);
const error = ref(null);
const route = useRoute();
const ticketId = route.params.idTicket;
const router = useRouter();

// 3. Variável de estado para controlar a visibilidade do modal
const isModalVisible = ref(false);

const markerPosition = computed(() => {
  if (ticket.value && ticket.value.localization) {
    const [lat, lng] = ticket.value.localization.split(',').map(Number);
    return { lat, lng };
  }
  return { lat: 0, lng: 0 };
});

// 4. Funções para abrir e fechar o modal
function openConfirmationModal() {
  isModalVisible.value = true;
}
function closeModal() {
  isModalVisible.value = false;
}

// 5. A função 'deleteTicket' agora é chamada pelo botão DENTRO do modal
async function deleteTicket() {
  try {
    await api.delete(`/tickets/${ticketId}`);
    toast.success('Solicitação excluída com sucesso!'); // Corrigi a mensagem de "atualizada" para "excluída"
    router.push('/');
  } catch (err) {
    console.error("Erro ao excluir o ticket:", err);
    toast.error("Não foi possível excluir a solicitação.");
  } finally {
    // Fecha o modal independentemente do resultado
    closeModal();
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
/* 6. ESTILOS PARA O NOSSO NOVO MODAL */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  width: 100%;
  max-width: 450px;
  text-align: center;
}
.modal-content h3 {
  margin-top: 0;
  margin-bottom: 1rem;
}
.modal-content p {
  margin-bottom: 2rem;
  color: #666;
}
.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.btn-secondary {
  background-color: #6c757d;
  color: white;
}
.btn-secondary:hover {
  background-color: #5a6268;
}
</style>