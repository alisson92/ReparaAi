import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CadastroView from '@/views/CadastroView.vue'
import SolicitacaoView from '@/views/SolicitacaoView.vue'
import TicketDetailView from '@/views/TicketDetailView.vue'
import TicketEditView from '@/views/TicketEditView.vue'
import LoginView from '@/views/LoginView.vue'

// nova importação
const AdminDashboardView = () => import('@/views/AdminDashboardView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { requiresAuth: true } },
    { path: '/cadastro', name: 'cadastro', component: CadastroView },
    { path: '/solicitacao', name: 'solicitacao', component: SolicitacaoView, meta: { requiresAuth: true } },
    { path: '/solicitacao/:idTicket', name: 'ticket-detalhes', component: TicketDetailView, meta: { requiresAuth: true } },
    { path: '/solicitacao/:idTicket/edit', name: 'ticket-editar', component: TicketEditView, meta: { requiresAuth: true } },
    { path: '/login', name: 'login', component: LoginView },

    // 🧩 nova rota
    { 
      path: '/admin', 
      name: 'admin', 
      component: AdminDashboardView, 
      meta: { requiresAuth: true, requiresAdmin: true }
    }
  ]
})

// --- Guarda de navegação atualizado ---
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken')
  const role = localStorage.getItem('userRole')

  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' })
  } else if (!to.meta.requiresAuth && token && to.name === 'login') {
    next({ name: 'home' })
  } else if (to.meta.requiresAdmin && role !== 'admin') {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
