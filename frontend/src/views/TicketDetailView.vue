<template>
  <div class="page page--details">
    <div class="card">
      <div v-if="isLoading" class="state state--loading">Carregando detalhes...</div>
      <div v-else-if="error" class="state state--error">{{ error }}</div>

      <div v-else-if="ticket" class="ticket-content">
        <header class="card__header">
          <h1 class="card__title">{{ ticket.header }}</h1>
          <p class="description">{{ ticket.description }}</p>
        </header>

        <div class="meta-data">
          <span><strong>Enviado por:</strong> {{ ticket.email }}</span>
          <span><strong>Em:</strong> {{ new Date(ticket.createdAt).toLocaleString('pt-BR') }}</span>
        </div>

        <div class="map-container">
          <GoogleMap 
            :api-key="apiKey" 
            style="width: 100%; height: 350px; border-radius: var(--border-radius); overflow: hidden;"
            :center="markerPosition" 
            :zoom="16"
          >
            <Marker :options="{ position: markerPosition }" />
          </GoogleMap>
        </div>

        <div class="actions">
          <RouterLink :to="`/solicitacao/${ticketId}/edit`">
            <button class="btn btn--edit">Editar</button>
          </RouterLink>
          <button @click="openConfirmationModal" class="btn btn--delete">
            Excluir Solicitação
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de confirmação -->
    <div v-if="isModalVisible" class="modal-overlay">
      <div class="modal-content">
        <h3>Confirmar Exclusão</h3>
        <p>Tem certeza que deseja excluir esta solicitação? Esta ação não pode ser desfeita.</p>
        <div class="modal-actions">
          <button @click="closeModal" class="btn btn--secondary">Cancelar</button>
          <button @click="deleteTicket" class="btn btn--delete">Sim, Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

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
  max-width: 820px;
  background: var(--surface-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
}

.card__title {
  margin-bottom: .75rem;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
}

.description {
  margin: 0;
  color: var(--text-color);
  line-height: 1.5;
}

.meta-data {
  margin: 1.25rem 0;
  font-size: .95rem;
  color: var(--text-color-secondary);
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: .5rem;
}
.meta-data strong {
  color: var(--text-color);
  font-weight: 600;
}

.map-container {
  margin: 1.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

/* Botões */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: transform .05s ease, filter .2s;
}
.btn:active {
  transform: translateY(1px);
}

/* Editar = laranja suave */
.btn--edit {
  background: #f8a25b;
  color: #fff;
}
.btn--edit:hover { background: #f77f2f; }

/* Excluir = vermelho */
.btn--delete {
  background: #dc3545;
  color: #fff;
}
.btn--delete:hover { background: #b02a37; }

/* Cancelar = cinza neutro */
.btn--secondary {
  background: #6c757d;
  color: #fff;
}
.btn--secondary:hover { background: #5a6268; }

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: var(--surface-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
  max-width: 460px;
  text-align: center;
}
.modal-content h3 {
  margin-bottom: 1rem;
  color: var(--text-color);
  font-size: 1.3rem;
  font-weight: 700;
}
.modal-content p {
  color: var(--text-color-secondary);
  margin-bottom: 1.5rem;
}
.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

/* Estados */
.state {
  padding: 1rem 0;
  color: var(--text-color-secondary);
  text-align: center;
}
.state--error { color: #b02a37; }

/* Responsivo */
@media (max-width: 600px) {
  .actions {
    flex-direction: column;
    align-items: stretch;
  }
  .actions .btn {
    width: 100%;
  }
}
</style>
