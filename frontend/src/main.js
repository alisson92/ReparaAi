import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// --- INÍCIO DA CONFIGURAÇÃO DO TOAST ---
import Toast from 'vue-toastification'
// Importando o CSS da biblioteca
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(router)

// Opções de configuração (opcional, mas recomendado)
const options = {
    transition: "Vue-Toastification__fade",
    maxToasts: 5,
    newestOnTop: true
};

app.use(Toast, options) // Registra a biblioteca na nossa aplicação
// --- FIM DA CONFIGURAÇÃO DO TOAST ---

app.mount('#app')