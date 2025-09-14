import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CadastroView from '@/views/CadastroView.vue'
import SolicitacaoView from '@/views/SolicitacaoView.vue'

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
    }
    // O bloco da rota '/about' foi removido daqui
  ]
})

export default router
