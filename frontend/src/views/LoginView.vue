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
                :class="{ invalid: errors.email }"
                @blur="validateField('email')"
              />
              <small v-if="errors.email" class="error">{{ errors.email }}</small>
            </div>

            <div class="form-group">
              <label for="password">Senha *</label>
              <input
                type="password"
                id="password"
                v-model="credentials.password"
                placeholder="Insira sua senha"
                required
                :class="{ invalid: errors.password }"
                @blur="validateField('password')"
              />
              <small v-if="errors.password" class="error">{{ errors.password }}</small>
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
import { jwtDecode } from 'jwt-decode'

const credentials = ref({ email: '', password: '' })
const errors = ref({})
const router = useRouter()
const toast = useToast()

function validateField(field) {
  if (!credentials.value[field]) {
    errors.value[field] = 'Campo obrigatório'
  } else {
    errors.value[field] = ''
  }
}

async function handleLogin() {
  try {
    const response = await api.post('/login', credentials.value)
    const token = response.data.token
    localStorage.setItem('authToken', token)

    // tenta pegar user.role do backend
    const user = response.data.user || {}
    let role = user.role

    // se não veio, tenta decodificar o token
    if (!role) {
      try {
        const decoded = jwtDecode(token)
        role = decoded?.role || (decoded?.isAdmin ? 'admin' : 'user')
      } catch {
        role = 'user'
      }
    }

    localStorage.setItem('userRole', role)
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
  background-color: var(--background-color);
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
  color: var(--text-color);
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

/* Feedback de erro */
input.invalid {
  border-color: #dc3545;
  background: #fff5f5;
}
.error {
  color: #dc3545;
  font-size: 0.85rem;
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
  height: 48px;
  padding: 0.9rem 1.5rem;
  border: none;
  background-color: var(--primary-color);
  color: white;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  transition: transform 0.05s ease, filter 0.2s;
}
button:hover { filter: brightness(1.1); }
button:active { transform: translateY(1px); }

/* Link de cadastro */
.register-link {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-color-secondary);
}
.register-link a {
  color: var(--secondary-color);
  font-weight: bold;
  text-decoration: none;
}
.register-link a:hover { text-decoration: underline; }

/* Responsivo */
@media (max-width: 900px) {
  .content-wrapper {
    flex-direction: column;
    aspect-ratio: auto;
  }
  .branding-panel { display: none; }
  .form-panel { flex: unset; padding: 2rem; }
}
</style>
