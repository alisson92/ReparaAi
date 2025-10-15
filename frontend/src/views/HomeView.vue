<template>
  <div class="page page--home">
    <div class="card">
      <!-- Cabeçalho -->
      <header class="home__header">
        <div>
          <h1 class="home__title">Solicitações Abertas</h1>
          <p class="home__subtitle">Acompanhe, edite e crie novas solicitações.</p>
        </div>
        <RouterLink
          to="/solicitacao"
          class="btn btn--cta"
          aria-label="Criar nova solicitação"
        >
          Nova Solicitação
        </RouterLink>
      </header>

      <!-- Barra de busca -->
      <div class="home__actions">
        <input
          v-model="searchQuery"
          type="search"
          class="input input--search"
          placeholder="Buscar por título ou descrição..."
          aria-label="Buscar solicitações"
        />
        <span class="home__count" v-if="!isLoading && !error">
          {{ filteredTickets.length }} resultado{{ filteredTickets.length === 1 ? '' : 's' }}
        </span>
      </div>

      <!-- Estados -->
      <div v-if="isLoading" class="state state--loading">Carregando solicitações...</div>
      <div v-else-if="error" class="state state--error">{{ error }}</div>
      <div v-else-if="filteredTickets.length === 0" class="state state--empty">
        Nenhuma solicitação encontrada. Seja o primeiro a criar uma!
      </div>

      <!-- Lista -->
      <div v-else class="tickets-list">
        <RouterLink
          v-for="ticket in filteredTickets"
          :key="ticket.idTicket"
          :to="'/solicitacao/' + ticket.idTicket"
          class="ticket-link"
        >
          <article class="ticket-card">
            <header class="ticket-header">
              <h2 class="ticket-title">{{ ticket.header }}</h2>
              <span class="status" :class="ticket.status || 'aberto'">
                {{ formatStatus(ticket.status) }}
              </span>
            </header>

            <p class="ticket-desc">{{ ticket.description }}</p>

            <footer class="ticket-footer">
              <span>📧 {{ ticket.email || '—' }}</span>
              <span>📅 {{ formatDate(ticket.createdAt) }}</span>
            </footer>
          </article>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import api from '../services/api'

const tickets = ref([])
const isLoading = ref(true)
const error = ref(null)
const searchQuery = ref('')

onMounted(async () => {
  try {
    const response = await api.get('/tickets')
    tickets.value = (response.data.Tickets || []).map(t => ({
      ...t,
      status: t.status || 'aberto'
    }))
  } catch (e) {
    console.error("Erro ao buscar os tickets:", e)
    error.value = 'Não foi possível carregar as solicitações.'
  } finally {
    isLoading.value = false
  }
})

const filteredTickets = computed(() => {
  const q = (searchQuery.value || '').toLowerCase().trim()
  if (!q) return tickets.value
  return tickets.value.filter(t =>
    (t.header || '').toLowerCase().includes(q) ||
    (t.description || '').toLowerCase().includes(q)
  )
})

function formatDate(value) {
  try {
    return value ? new Date(value).toLocaleDateString('pt-BR') : '—'
  } catch {
    return '—'
  }
}

function formatStatus(status) {
  switch (status) {
    case 'resolvido': return 'Resolvido'
    case 'andamento': return 'Em andamento'
    default: return 'Aberto'
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
  max-width: 980px;
  background: var(--surface-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
}

/* Cabeçalho */
.home__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
}
.home__title {
  margin: 0;
  font-size: 1.75rem;
  color: var(--primary-color);
}
.home__subtitle {
  margin: .25rem 0 0;
  color: var(--text-color-secondary);
  font-size: .95rem;
}

/* Ações de topo */
.home__actions {
  display: flex;
  align-items: center;
  gap: .75rem;
  margin: .5rem 0 1rem;
}
.input--search {
  flex: 1;
  height: 44px;
  padding: 0 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: #fff;
  color: var(--text-color);
  transition: border-color .2s, box-shadow .2s;
}
.input--search::placeholder { color: var(--text-color-secondary); }
.input--search:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--focus-ring);
  outline: none;
}
.home__count { color: var(--text-color-secondary); }

/* Lista */
.tickets-list {
  display: grid;
  gap: 1rem;
}

/* Card de ticket */
.ticket-link {
  text-decoration: none;
  color: inherit;
  display: block;
}
.ticket-card {
  padding: 1.25rem 1.25rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.ticket-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0,0,0,0.08);
  border-color: color-mix(in srgb, var(--primary-color) 15%, var(--border-color));
}
.ticket-card:active {
  transform: translateY(1px);
}

/* Cabeçalho do card */
.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: .75rem;
}
.ticket-title {
  margin: 0;
  font-size: 1.125rem;
  color: var(--text-color);
}

/* Descrição */
.ticket-desc {
  margin: .5rem 0 0;
  color: var(--text-color);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Rodapé */
.ticket-footer {
  margin-top: .75rem;
  padding-top: .75rem;
  border-top: 1px solid var(--border-color);
  font-size: .85rem;
  color: var(--text-color-secondary);
  display: flex;
  justify-content: space-between;
  gap: .5rem;
}

/* Status */
.status {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.status.aberto {
  background: var(--primary-color);
  color: #fff;
}
.status.andamento {
  background: var(--accent-orange);
  color: #fff;
}
.status.resolvido {
  background: var(--accent-green);
  color: #fff;
}

/* Estados */
.state {
  padding: 1rem 0;
  color: var(--text-color-secondary);
  text-align: center;
}
.state--error { color: #b02a37; }

/* Botão CTA (topo) */
.btn {
  height: 40px;
  padding: 0 1rem;
  border: 0;
  border-radius: var(--border-radius);
  font-weight: 600;
  cursor: pointer;
  transition: all .2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.btn--cta {
  background: var(--accent-green);
  color: #fff;
}
.btn--cta:hover { filter: brightness(1.08); }
.btn--cta:active { transform: translateY(1px); }

/* Responsivo */
@media (max-width: 860px) {
  .home__header { flex-direction: column; align-items: stretch; }
  .btn--cta { width: 100%; height: 44px; }
}
</style>
