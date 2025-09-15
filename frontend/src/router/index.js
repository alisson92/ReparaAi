import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CadastroView from '@/views/CadastroView.vue'
import SolicitacaoView from '@/views/SolicitacaoView.vue'
import TicketDetailView from '@/views/TicketDetailView.vue'
import TicketEditView from '@/views/TicketEditView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true } // Esta rota precisa de login
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView
      // Rota pública, não precisa de login
    },
    {
      path: '/solicitacao',
      name: 'solicitacao',
      component: SolicitacaoView,
      meta: { requiresAuth: true } // Esta rota precisa de login
    },
    {
      path: '/solicitacao/:idTicket',
      name: 'ticket-detalhes',
      component: TicketDetailView,
      meta: { requiresAuth: true } // Esta rota precisa de login
    },
    {
      path: '/solicitacao/:idTicket/edit',
      name: 'ticket-editar',
      component: TicketEditView,
      meta: { requiresAuth: true } // Esta rota precisa de login
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
      // Rota pública
    }
  ]
});

// --- O GUARDA DE NAVEGAÇÃO ---
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Verifica se o token existe

  // Se a rota que o usuário quer acessar (to) precisa de autenticação E ele não está autenticado
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redireciona para a página de login
    next({ name: 'login' });
  } 
  // Se o usuário está autenticado e tenta acessar a página de login
  else if (!to.meta.requiresAuth && isAuthenticated && to.name === 'login') {
    // Redireciona para a home, pois ele já está logado
    next({ name: 'home' });
  }
  else {
    // Se nenhuma das condições acima for atendida, deixa o usuário prosseguir
    next();
  }
});

export default router;