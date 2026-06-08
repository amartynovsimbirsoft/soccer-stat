<template>
  <div>
    <v-btn
      prepend-icon="$vuetify"
      stacked
    >
      Моя кнопка
    </v-btn>
    <input
      v-model="search"
      placeholder="Поиск лиги"
    >
    <div v-if="loading">
      Загрузка...
    </div>
    <div v-else-if="error">
      Ошибка
    </div>
    <div
      v-for="league in filteredPartipants"
      v-else
      :key="league.id"
      class="league-item"
      @click="goToLeague(league.id)"
    >
      <strong>{{ league.name }}</strong> — {{ league.stadium }}
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const search = ref('')

const partipants = ref([])
const error = ref()
const loading = ref(true)

const filteredPartipants = computed(() => 
 
  partipants.value.filter(l =>
    l.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const goToLeague = (id) => {
  console.log(id);
  router.push(`/match/${id}`) // Переходим на маршрут /match/:id
}

const fetchParticipants = async () => {
  loading.value = true
  try {
    const response = await axios.get('https://livescore-api.com/api-client/competitions/participants.json',
    {
      params: {
        key: process.env.VUE_APP_API_KEY,
        secret: process.env.VUE_APP_API_SECRET,
        competition_id: 362,
        season: 2026
      }
    }
  )
    if (response.data.success) {
      partipants.value = response.data.data
    }
  } catch(err) {
    if (err.response) {
    // Сервер ответил с ошибкой (4xx или 5xx)
    const status = err.response.status;
    if (status === 401) error.value = 'Ошибка авторизации. Проверьте ключ API.';
    else if (status === 404) error.value = 'Соревнование не найдено.';
    else if (status === 429) error.value = 'Слишком много запросов. Попробуйте завтра.';
    else error.value = `Ошибка сервера (${status}). Попробуйте позже.`;
  } else if (err.request) {
    // Запрос был отправлен, но ответа нет (нет интернета, CORS)
    error.value = 'Нет ответа от сервера. Проверьте соединение.';
  } else {
    // Прочие ошибки, например, при настройке запроса
    error.value = 'Неизвестная ошибка. Обновите страницу.';
  }
  } finally {
    loading.value = false
  }
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
</style>