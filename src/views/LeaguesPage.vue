<template>
  <div>
    <input
      v-model="search"
      placeholder="Поиск участников"
    >
    
    <!-- Показываем индикатор загрузки -->
    <div v-if="loading">
      ⏳ Загрузка...
    </div>
    
    <!-- Показываем ошибку, если есть -->
    <div
      v-else-if="error"
      class="error"
    >
      {{ error }}
    </div>
    
    <!-- Список участников -->
    <div v-else>
      <div
        v-for="item in filteredParticipants"
        :key="item.id"
        class="league-item"
        @click="goToParticipant(item.id)"
      >
        <strong>{{ item.name }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const search = ref('')

// Реактивные переменные
const participants = ref([])   // ✅ используем const и .value
const loading = ref(true)
const error = ref(null)

// Фильтрация по поиску
const filteredParticipants = computed(() => {
  if (!search.value) return participants.value
  return participants.value.filter(item =>
    item.name?.toLowerCase().includes(search.value.toLowerCase())
  )
})

// Загрузка данных
const fetchParticipants = async () => {
  console.log('Все переменные process.env:', process.env);
  console.log('Ключ:', process.env.VUE_APP_API_KEY);
  loading.value = true
  error.value = null
  try {
    const response = await axios.get(
      'https://livescore-api.com/api-client/competitions/participants.json',
      {
        params: {
          key: process.env.VUE_APP_API_KEY,
          secret: process.env.VUE_APP_API_SECRET,
          competition_id: 362,
          season: 2026
        }
      }
    )

    if (response.data.success && response.data.data) {
      // ✅ Важно: присваиваем через .value, чтобы сохранить реактивность
      // Уточните, где именно лежит массив участников. Возможно:
      // response.data.data.participants
      // или response.data.data (если это уже массив)
      participants.value = response.data.data.participants || response.data.data || []
      console.log('Загружено участников:', participants.value.length)
    } else {
      error.value = 'Не удалось загрузить данные.'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Ошибка сети или сервера.'
  } finally {
    loading.value = false
  }
}

// Переход при клике (если нужен)
const goToParticipant = (id) => {
  router.push(`/participant/${id}`)
}

onMounted(() => {
  fetchParticipants()
})
</script>

<style scoped>
.league-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.league-item:hover {
  background: #f5f5f5;
}
.error {
  color: red;
  padding: 10px;
}
</style>