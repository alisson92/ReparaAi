<template>
  <header v-if="isNavVisible" class="main-header">
    <div class="header-content">
      <div class="logo">
        <h1>ReparaAi</h1>
        <p>Sua cidade na palma da mão</p>
      </div>
      <div class="user-status" v-if="isLoggedIn">
        <span>Usuário: {{ userName || 'Carregando...' }}</span>
      </div>
    </div>
    <nav class="main-nav">
      <template v-if="isLoggedIn">
        <RouterLink to="/">Acompanhamento</RouterLink>
        <RouterLink to="/solicitacao">Registro de Ocorrências</RouterLink>
        <a href="#" @click.prevent="handleLogout" class="logout-link">Sair</a>
      </template>
      <template v-else>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/cadastro">Cadastro</RouterLink>
      </template>
    </nav>
  </header>

  <main class="main-content">
    <RouterView />
  </main>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router';
import { jwtDecode } from 'jwt-decode';

const router = useRouter();
const route = useRoute();
const isLoggedIn = ref(false);
const userName = ref(null);

// 3. Crie a propriedade computada
// Ela vai verificar o nome da rota atual e retornar true/false
const isNavVisible = computed(() => {
  const hiddenRoutes = ['login', 'cadastro'];
  return !hiddenRoutes.includes(route.name);
});

const mainContentPadding = computed(() => {
  return isNavVisible.value ? '2rem' : '0';
});

function checkAuthStatus() {
  const token = localStorage.getItem('authToken');
  isLoggedIn.value = !!token;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userName.value = decodedToken.name; // Pega o nome do usuário do token
    } catch (error) {
      console.error("Erro ao decodificar o token:", error);
      handleLogout(); // Se o token for inválido, faz o logout
    }
  } else {
    userName.value = null;
  }
}

function handleLogout() {
  localStorage.removeItem('authToken');
  checkAuthStatus();
  router.push('/login');
}

onMounted(checkAuthStatus);
watch(route, checkAuthStatus);
</script>

<style scoped>
.main-header {
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  box-shadow: var(--box-shadow);
}
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.logo h1 { margin: 0; font-weight: 700; font-size: 1.8rem; }
.logo p { margin: 0; opacity: 0.9; }
.user-status { font-size: 0.9rem; }

.main-nav {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.main-nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.15);
  transition: background-color 0.3s;
  font-weight: 500;
}
.main-nav a:hover, .main-nav a.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.3);
}
.logout-link {
  background-color: rgba(220, 53, 69, 0.7) !important;
}
.logout-link:hover {
   background-color: rgba(220, 53, 69, 1) !important;
}
.main-content {
  padding: v-bind(mainContentPadding);
}
</style>