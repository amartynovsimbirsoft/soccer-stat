<template>
  <div>
    <input
      v-model="search"
      placeholder="Поиск лиги"
    >
    <div
      v-for="league in filteredLeagues"
      :key="league.id"
      class="league-item"
      @click="goToLeague(league.id)"
    >
      <strong>{{ league.name }}</strong> — {{ league.country }}
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'

import { useRouter } from 'vue-router'  // 👈 ДОБАВИТЬ ЭТОТ ИМПОРТ

const router = useRouter()  // 👈 И ЭТУ СТРОКУ

const search = ref('')
const leagues = ref([
  { id: 1, name: 'Premier League', country: 'Англия' },
  { id: 2, name: 'La Liga', country: 'Испания' },
  { id: 3, name: 'Bundesliga', country: 'Германия' }
])

const filteredLeagues = computed(() =>
  leagues.value.filter(l =>
    l.name.toLowerCase().includes(search.value.toLowerCase())
  )
)

const goToLeague = (id) => {
  router.push(`/league/${id}`) // Переходим на маршрут /league/:id
}
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