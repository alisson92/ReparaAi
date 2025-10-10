<template>
  <div class="login-page">
    <div class="content-wrapper">
      <div class="branding-panel"></div>

      <div class="form-panel">
        <div class="login-form-container">
          <h2>Bem-Vindo!</h2>
          <p>Coloque seu login e senha para entrar!</p>

          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="email">Login *</label>
              <input
                type="email"
                id="email"
                v-model="credentials.email"
                placeholder="Insira seu login"
                required
              />
            </div>

            <div class="form-group">
              <label for="password">Senha *</label>
              <input
                type="password"
                id="password"
                v-model="credentials.password"
                placeholder="Insira sua senha"
                required
              />
            </div>

            <a href="#" class="forgot-password">Esqueceu sua senha?</a>

            <button type="submit">Entrar</button>
          </form>

          <div class="register-link">
            <p>
              Não tem uma conta?
              <RouterLink to="/cadastro">Cadastre-se</RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import api from '../services/api'
import { useToast } from 'vue-toastification/dist/index.mjs'

const credentials = ref({ email: '', password: '' })
const router = useRouter()
const toast = useToast()

async function handleLogin() {
  try {
    const response = await api.post('/login', credentials.value)
    const token = response.data.token
    localStorage.setItem('authToken', token)
    toast.success('Login realizado com sucesso!')
    router.push('/')
  } catch (error) {
    console.error('Erro de login:', error)
    const errorMessage = error.response?.data?.error || 'Não foi possível fazer o login.'
    toast.error(errorMessage)
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 2rem;
  background-color: var(--background-color); /* fundo suave */
}

.content-wrapper {
  display: flex;
  width: 100%;
  max-width: 1500px;
  aspect-ratio: 5 / 3;
  box-shadow: var(--box-shadow);
  border-radius: 20px;
  overflow: hidden;
}

.branding-panel {
  flex: 1;
  background-image: url(@/assets/images/reparaai-logo.png);
  background-size: cover;
  background-position: center;
}

.form-panel {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--surface-color);
}

.login-form-container {
  width: 100%;
  max-width: 380px;
  padding: 2rem;
}
.login-form-container h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}
.login-form-container p {
  margin-bottom: 2rem;
  color: var(--text-color-secondary);
}

.form-group {
  margin-bottom: 1.5rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.form-group input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--surface-color);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.form-group input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--focus-ring);
  outline: none;
}

/* Links auxiliares */
.forgot-password {
  display: block;
  text-align: right;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.2s;
}
.forgot-password:hover {
  text-decoration: underline;
}

/* Botão principal */
button {
  width: 100%;
  padding: 0.9rem 1.5rem;
  border: none;
  background-color: var(--primary-color); /* azul padrão */
  color: white;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease;
}
button:hover {
  filter: brightness(1.1);
}

/* Link de cadastro */
.register-link {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: #555;
}
.register-link a {
  color: var(--secondary-color); /* laranja */
  font-weight: bold;
}
</style>
