<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Painel do Administrador</h1>

    <div class="mb-4 flex gap-2 items-center">
      <label>Status:</label>
      <select v-model="filter.status" @change="fetchReports">
        <option value="">Todos</option>
        <option value="pendente">Pendente</option>
        <option value="em_andamento">Em andamento</option>
        <option value="resolvido">Resolvido</option>
      </select>
    </div>

    <div v-if="loading">Carregando...</div>
    <div v-else-if="error" class="text-red-600">{{ error }}</div>
    <div v-else>
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="border p-2">ID</th>
            <th class="border p-2">Título</th>
            <th class="border p-2">Status</th>
            <th class="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in reports" :key="r.id">
            <td class="border p-2">{{ r.id }}</td>
            <td class="border p-2">{{ r.title }}</td>
            <td class="border p-2">{{ r.status }}</td>
            <td class="border p-2">
              <select v-model="r.status" @change="updateStatus(r)">
                <option value="pendente">pendente</option>
                <option value="em_andamento">em_andamento</option>
                <option value="resolvido">resolvido</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="!reports.length" class="mt-4 text-gray-500">Nenhuma solicitação encontrada.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useToast } from 'vue-toastification'

const toast = useToast()
const reports = ref([])
const loading = ref(false)
const error = ref('')
const filter = ref({ status: '' })

const fetchReports = async () => {
  try {
    loading.value = true
    error.value = ''
    const { data } = await api.get('/admin/reports', { params: { status: filter.value.status || undefined } })
    reports.value = data
  } catch (err) {
    error.value = err?.response?.data?.message || 'Erro ao carregar as solicitações.'
  } finally {
    loading.value = false
  }
}

const updateStatus = async (r) => {
  try {
    await api.patch(`/admin/reports/${r.id}/status`, { status: r.status })
    toast.success('Status atualizado.')
  } catch (err) {
    toast.error('Falha ao atualizar status.')
  }
}

onMounted(fetchReports)
</script>

<style scoped>
table { border: 1px solid #ddd; }
th { background: #f9f9f9; }
</style>
