<template>
  <div class="page page--form">
    <div class="card">
      <header class="card__header">
        <h1 class="card__title">Crie sua conta no ReparaAí</h1>
        <p class="card__subtitle">Leva menos de 2 minutos ✨</p>
      </header>

      <form class="form" @submit.prevent="registerUser">
        <!-- INFORMAÇÕES PESSOAIS -->
        <section class="section">
          <div class="section__title">
            <span class="dot dot--green"></span>
            <h2>Informações Pessoais</h2>
          </div>

          <div class="form__grid">
            <div class="form__field form__field--full">
              <label for="name">Nome completo *</label>
              <input
                id="name"
                type="text"
                v-model="userData.name"
                required
                placeholder="Ex.: Maria Silva"
                :class="{ invalid: errors.name }"
                @blur="validateField('name')"
              />
              <small v-if="errors.name" class="error">{{ errors.name }}</small>
            </div>

            <div class="form__field">
              <label for="email">Email *</label>
              <input
                id="email"
                type="email"
                v-model="userData.email"
                required
                placeholder="seuemail@exemplo.com"
                :class="{ invalid: errors.email }"
                @blur="validateField('email')"
              />
              <small v-if="errors.email" class="error">{{ errors.email }}</small>
            </div>

            <div class="form__field">
              <label for="password">Senha *</label>
              <input
                id="password"
                type="password"
                v-model="userData.password"
                required
                placeholder="Mínimo 8 caracteres"
                :class="{ invalid: errors.password }"
                @blur="validateField('password')"
              />
              <small v-if="errors.password" class="error">{{ errors.password }}</small>
            </div>

            <div class="form__field">
              <label for="cpf">CPF *</label>
              <input
                id="cpf"
                type="text"
                v-model="userData.cpf"
                required
                placeholder="000.000.000-00"
                :class="{ invalid: errors.cpf }"
                @blur="validateField('cpf')"
              />
              <small v-if="errors.cpf" class="error">{{ errors.cpf }}</small>
            </div>

            <div class="form__field">
              <label for="phone">Telefone *</label>
              <input
                id="phone"
                type="tel"
                v-model="userData.phone"
                required
                placeholder="(11) 90000-0000"
                :class="{ invalid: errors.phone }"
                @blur="validateField('phone')"
              />
              <small v-if="errors.phone" class="error">{{ errors.phone }}</small>
            </div>

            <div class="form__field">
              <label for="birthDate">Data de Nascimento *</label>
              <input
                id="birthDate"
                type="date"
                v-model="userData.birthDate"
                required
                :class="{ invalid: errors.birthDate }"
                @blur="validateField('birthDate')"
              />
              <small v-if="errors.birthDate" class="error">{{ errors.birthDate }}</small>
            </div>
          </div>
        </section>

        <!-- ENDEREÇO -->
        <section class="section">
          <div class="section__title">
            <span class="dot dot--orange"></span>
            <h2>Endereço</h2>
          </div>

          <div class="form__grid">
            <div class="form__field">
              <label for="cep">CEP *</label>
              <input
                id="cep"
                type="text"
                v-model="userData.cep"
                required
                placeholder="00000-000"
                :class="{ invalid: errors.cep }"
                @blur="validateField('cep')"
              />
              <small v-if="errors.cep" class="error">{{ errors.cep }}</small>
            </div>

            <div class="form__field form__field--2">
              <label for="street">Rua *</label>
              <input
                id="street"
                type="text"
                v-model="userData.street"
                required
                placeholder="Nome da rua/avenida"
                :class="{ invalid: errors.street }"
                @blur="validateField('street')"
              />
              <small v-if="errors.street" class="error">{{ errors.street }}</small>
            </div>

            <div class="form__field">
              <label for="number">Número *</label>
              <input
                id="number"
                type="text"
                v-model="userData.number"
                required
                placeholder="123"
                :class="{ invalid: errors.number }"
                @blur="validateField('number')"
              />
              <small v-if="errors.number" class="error">{{ errors.number }}</small>
            </div>

            <div class="form__field">
              <label for="neighborhood">Bairro *</label>
              <input
                id="neighborhood"
                type="text"
                v-model="userData.neighborhood"
                required
                placeholder="Bairro"
                :class="{ invalid: errors.neighborhood }"
                @blur="validateField('neighborhood')"
              />
              <small v-if="errors.neighborhood" class="error">{{ errors.neighborhood }}</small>
            </div>

            <div class="form__field">
              <label for="city">Cidade *</label>
              <input
                id="city"
                type="text"
                v-model="userData.city"
                required
                placeholder="Cidade"
                :class="{ invalid: errors.city }"
                @blur="validateField('city')"
              />
              <small v-if="errors.city" class="error">{{ errors.city }}</small>
            </div>

            <div class="form__field">
              <label for="state">Estado *</label>
              <input
                id="state"
                type="text"
                v-model="userData.state"
                required
                placeholder="UF"
                :class="{ invalid: errors.state }"
                @blur="validateField('state')"
              />
              <small v-if="errors.state" class="error">{{ errors.state }}</small>
            </div>
          </div>
        </section>

        <div class="form__actions">
          <button class="btn btn--primary" type="submit">Cadastrar</button>
        </div>

        <p class="form__footnote">
          Já tem conta?
          <router-link to="/login" class="link">Faça login</router-link>.
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'
import { useToast } from 'vue-toastification/dist/index.mjs'

const toast = useToast()

const userData = ref({
  name: '',
  email: '',
  password: '',
  cpf: '',
  phone: '',
  birthDate: '',
  cep: '',
  street: '',
  number: '',
  neighborhood: '',
  city: '',
  state: ''
})

const errors = ref({})

function validateField(field) {
  if (!userData.value[field]) {
    errors.value[field] = 'Campo obrigatório'
  } else {
    errors.value[field] = ''
  }
}

async function registerUser () {
  try {
    const { data } = await api.post('/user', userData.value)
    toast.success('Usuário cadastrado com sucesso!')
    Object.keys(userData.value).forEach(k => (userData.value[k] = ''))
    errors.value = {}
    console.log(data)
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error)
    const msg = error?.response?.data?.message || 'Não foi possível completar o cadastro.'
    toast.error(msg)
  }
}
</script>

<style scoped>
.page {
  min-height: 100dvh;
  display: grid;
  place-items: center;
  background: var(--background-color);
  padding: 2rem;
}

.card {
  width: 100%;
  max-width: 980px;
  background: var(--surface-color);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding: 2rem;
}

.card__header { margin-bottom: 1rem; }
.card__title {
  margin: 0 0 .25rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-color);
}
.card__subtitle {
  margin: 0;
  color: var(--text-color-secondary);
}

.section { margin-top: 1.25rem; }
.section__title {
  display: flex; align-items: center; gap: .5rem;
  margin-bottom: .75rem;
}
.section__title h2 {
  font-size: 1.125rem; margin: 0; color: var(--text-color);
}
.dot { width: .6rem; height: .6rem; border-radius: 999px; display: inline-block; }
.dot--green  { background: var(--accent-green); }
.dot--orange { background: var(--accent-orange); }

.form { margin-top: .25rem; }
.form__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem 1.25rem;
}
.form__field { display: flex; flex-direction: column; gap: .4rem; }
.form__field--full { grid-column: 1 / -1; }
.form__field--2 { grid-column: span 2; }

label { font-weight: 600; color: var(--text-color); }
input {
  height: 44px;
  padding: 0 .9rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background: var(--surface-color);
  color: var(--text-color);
  outline: none;
  transition: border-color .2s, box-shadow .2s, background .2s;
}
input::placeholder { color: var(--text-color-secondary); }
input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--focus-ring);
  background: #fff;
}

.form__actions { margin-top: 1.25rem; }
.btn {
  height: 48px; padding: 0 1.25rem; border: 0; border-radius: var(--border-radius);
  font-weight: 700; cursor: pointer; transition: transform .05s ease, filter .2s;
}
.btn--primary {
  width: 100%;
  background: var(--primary-color);
  color: #fff;
}
.btn--primary:hover { filter: brightness(1.05); }
.btn--primary:active { transform: translateY(1px); }

.form__footnote {
  margin-top: .875rem;
  color: var(--text-color-secondary);
  text-align: center;
}
.link {
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: 600;
}
.link:hover { text-decoration: underline; }

@media (max-width: 820px) {
  .card { padding: 1.25rem; }
  .form__grid { grid-template-columns: 1fr; }
  .form__field--2 { grid-column: 1 / -1; }
}

/* 🔸 Apenas adições para feedback de erro (não altera o resto) */
input.invalid {
  border-color: #dc3545;
  background: #fff5f5;
}
.error {
  color: #dc3545;
  font-size: 0.85rem;
}
</style>
