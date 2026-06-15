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
    const response = await axios.get('/leagues.json')
    partipants.value = response.data
  } catch(err) {
    console.log(err)
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