<template>
  <div class="page page--edit">
    <div class="card">
      <h1 class="card__title">Editar Solicitação</h1>

      <div v-if="isLoading" class="state state--loading">Carregando...</div>
      <div v-else-if="error" class="state state--error">{{ error }}</div>

      <form v-else @submit.prevent="updateTicket" class="form">
        <div class="form-group">
          <label for="header">Título da Solicitação *</label>
          <input
            type="text"
            id="header"
            v-model="ticketData.header"
            required
            placeholder="Ex: Buraco em frente ao número 123"
          />
        </div>

        <div class="form-group">
          <label for="description">Descrição Detalhada *</label>
          <textarea
            id="description"
            v-model="ticketData.description"
            required
            rows="5"
            placeholder="Forneça mais detalhes sobre o problema..."
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

        <div class="form__actions">
          <button type="submit" class="btn btn--primary">Salvar Alterações</button>
        </div>
      </form>
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

/* Formulário */
.form-group {
  margin-bottom: 1.5rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-color);
}
input,
textarea {
  width: 100%;
  padding: 0.75rem 1rem;
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

/* Coordenadas */
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

/* Ações */
.form__actions {
  margin-top: 1rem;
}
.btn {
  padding: 0.85rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.05s ease, filter 0.2s;
  width: 100%;
  font-size: 1rem;
}
.btn:active {
  transform: translateY(1px);
}

/* Botão primário */
.btn--primary {
  background: var(--primary-color);
  color: #fff;
}
.btn--primary:hover {
  filter: brightness(1.1);
}

/* Estados */
.state {
  padding: 1rem 0;
  text-align: center;
  color: var(--text-color-secondary);
}
.state--error {
  color: #b02a37;
}

/* Responsivo */
@media (max-width: 600px) {
  .card {
    padding: 1.25rem;
  }
}
</style>
