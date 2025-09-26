import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// --- INÍCIO DA CORREÇÃO ---
// A importação precisa apontar para o arquivo de módulo '.mjs'
import Toast from 'vue-toastification/dist/index.mjs'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(router)

const options = {
    transition: "Vue-Toastification__fade",
    maxToasts: 5,
    newestOnTop: true
};

app.use(Toast, options)
// --- FIM DA CORREÇÃO ---

app.mount('#app')