<template>
  <div class="login-page">
    <div class="content-wrapper">
      <div class="branding-panel">
        <img src="@/assets/images/reparaai-logo.png" alt="Logo ReparaAi" class="app-logo">
      </div>

      <div class="form-panel">
        <div class="login-form-container">
          <h2>Bem-Vindo!</h2>
          <p>Coloque seu login e senha para entrar!</p>
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="email">Login *</label>
              <input type="email" id="email" v-model="credentials.email" placeholder="Insira seu login" required>
            </div>
            <div class="form-group">
              <label for="password">Senha *</label>
              <input type="password" id="password" v-model="credentials.password" placeholder="Insira sua senha" required>
            </div>
            <a href="#" class="forgot-password">Esqueceu sua senha?</a>
            <button type="submit">ENTRAR</button>
          </form>
           <div class="register-link">
              <p>Não tem uma conta? <RouterLink to="/cadastro">Cadastre-se</RouterLink></p>
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// O SCRIPT SETUP CONTINUA EXATAMENTE O MESMO
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import api from '../services/api';
import { useToast } from 'vue-toastification/dist/index.mjs';

const credentials = ref({ email: '', password: '' });
const router = useRouter();
const toast = useToast();

async function handleLogin() { /* ... (código da função continua o mesmo) ... */ }
</script>

<style scoped>
/* ESTILO ATUALIZADO PARA O NOVO LAYOUT */

.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  background-color: var(--background-color);
}

/* O container principal agora usa Grid para um controle mais fino das colunas */
.content-wrapper {
  display: grid;
  /* 1. MUDANÇA: O painel da esquerda (45%) será um pouco menor que o da direita (55%) */
  grid-template-columns: 45% 55%; 
  width: 100%;
  max-width: 1100px;
  height: 650px;
  box-shadow: var(--box-shadow);
  border-radius: 20px;
  overflow: hidden;
}

/* Painel da Esquerda com um gradiente suave extraído da sua logo */
.branding-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: linear-gradient(160deg, #d4f0f0 0%, #a2d2ff 100%);
}

/* 2. MUDANÇA: A logo agora ocupa 80% do espaço do painel e tem bordas arredondadas */
.app-logo {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
  border-radius: 15px; /* Bordas levemente arredondadas na imagem */
  box-shadow: 0 5px 15px rgba(0,0,0,0.1); /* Sombra sutil na própria logo */
}

.form-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--surface-color);
}

/* O resto do CSS do formulário continua o mesmo */
.login-form-container { width: 100%; max-width: 380px; padding: 2rem; }
.login-form-container h2 { font-size: 2rem; font-weight: 700; margin-bottom: 0.5rem; }
.login-form-container p { margin-bottom: 2rem; color: var(--text-color-secondary); }
.form-group { margin-bottom: 1.5rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: 500; }
.form-group input { width: 100%; padding: 0.8rem 1rem; border: 1px solid var(--border-color); border-radius: var(--border-radius); }
.forgot-password { display: block; text-align: right; margin-bottom: 1.5rem; font-size: 0.9rem; color: #007bff; text-decoration: none; }
button { width: 100%; padding: 0.9rem 1.5rem; border: none; background-color: #3b3a51; color: white; border-radius: var(--border-radius); cursor: pointer; font-size: 1rem; font-weight: bold; text-transform: uppercase; transition: background-color 0.3s; }
button:hover { background-color: #2b2a3d; }
.register-link { margin-top: 2rem; text-align: center; font-size: 0.9rem; color: #555; }
.register-link a { color: #007bff; font-weight: bold; }
</style>