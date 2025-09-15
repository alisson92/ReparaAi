<template>
  <header>
    <div class="wrapper">
      <nav v-if="isLoggedIn">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/solicitacao">Nova Solicitação</RouterLink>
        <a href="#" @click.prevent="handleLogout" class="logout-link">Sair</a>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Nossa variável reativa para saber se o usuário está logado
const isLoggedIn = ref(false);

// Função para verificar o estado de login
function checkAuthStatus() {
  isLoggedIn.value = !!localStorage.getItem('authToken');
}

// Função para o Logout
function handleLogout() {
  // 1. Remove o token do localStorage
  localStorage.removeItem('authToken');
  // 2. Atualiza nosso estado
  checkAuthStatus();
  // 3. Redireciona para a página de login
  router.push('/login');
}

// Verifica o status de login quando o componente é montado pela primeira vez
onMounted(() => {
  checkAuthStatus();
});

// 'watch' fica "escutando" mudanças na rota. Toda vez que a rota mudar,
// verificamos o status de login novamente. Isso garante que o menu apareça
// imediatamente após o login.
watch(route, () => {
  checkAuthStatus();
});
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
.wrapper {
  padding: 1rem 2rem;
  border-bottom: 1px solid #e0e0e0;
}
nav {
  width: 100%;
  font-size: 1rem;
  text-align: left;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
nav a:first-of-type {
  border: 0;
  padding-left: 0;
}
.logout-link {
  cursor: pointer;
  color: #dc3545; /* Uma cor de destaque para o logout */
}
</style>