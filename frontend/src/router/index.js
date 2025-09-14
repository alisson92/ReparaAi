import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CadastroView from '@/views/CadastroView.vue'
import SolicitacaoView from '@/views/SolicitacaoView.vue'
import TicketDetailView from '@/views/TicketDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: CadastroView
    },
    {
      path: '/solicitacao',
      name: 'solicitacao',
      component: SolicitacaoView
    },
    {
      path: '/solicitacao/:idTicket', // O :idTicket é o parâmetro dinâmico
      name: 'ticket-detalhes',
      component: TicketDetailView
    }
  ]
})

export default router
