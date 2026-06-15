<template>
  <v-container>
    <h1>Страница матчей для лиги {{ LeagueId }}</h1>

    <v-row
      align="center"
      class="mb-4"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-text-field
          v-model="search"
          label="Поиск по команде"
          prepend-inner-icon="mdi-magnify"
          clearable
          variant="outlined"
          density="comfortable"
        />
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-menu>
          <template #activator="{ props }">
            <v-text-field
              v-bind="props"
              label="Дата от"
              :model-value="formattedDateFrom"
              placeholder="ДД.ММ.ГГГГ"
              readonly
              variant="outlined"
              density="comfortable"
            />
          </template>
          <v-locale-provider locale="ru">
            <v-date-picker 
              v-model="dateFrom"
              header="Выберите дату"
              title="Выбор даты"
              @update:model-value="dateFrom = $event" 
            />
          </v-locale-provider>
        </v-menu>
      </v-col>
      <v-col
        cols="12"
        md="3"
      >
        <v-menu>
          <template #activator="{ props }">
            <v-text-field
              v-bind="props"
              label="Дата до"
              :model-value="dateTo"
              readonly
              variant="outlined"
              density="comfortable"
            />
          </template>
          <v-date-picker v-model="dateTo" />
        </v-menu>
      </v-col>
    </v-row>    

    <div v-if="loading">
      <v-progress-circular indeterminate />
    </div>
    <div v-else>
      <v-data-table
        :headers="headers"
        :items="filteredMatches"
      >
        <template #item.date="{ item }">
          {{ formatDate(item.date) }}
        </template>

        <template #item.scoreText="{ item }">
          <v-chip color="blue">{{ item.scoreText }}</v-chip>
        </template>
      </v-data-table>
    </div>
  </v-container>
</template>

<script setup>

import { useRoute } from 'vue-router'
import axios from 'axios'
import { ref, onMounted, computed } from 'vue'

const route = useRoute()
const LeagueId = route.params.id
const search = ref('')
const dateFrom = ref('')
const dateTo = ref('')

// Заголовки таблицы
const headers = [
  { title: 'Дата', key: 'date', sortable: true },
  { title: 'Время', key: 'time', sortable: true },
  { title: 'Хозяева', key: 'home_team', sortable: true },
  { title: 'Гости', key: 'away_team', sortable: true },
  { title: 'Счёт', key: 'scoreText', sortable: false },
]

// Данные
const matches = ref([])
const loading = ref(true)

// Форматирование даты для отображения (YYYY-MM-DD -> DD.MM.YYYY)
const formatDateDisplay = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  return `${day}.${month}.${year}`
}

// Функции форматирования
const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  const date = new Date(dateStr)
  return date.toLocaleDateString('ru-RU')
}

const formattedDateFrom = computed(() => formatDateDisplay(dateFrom.value))

const fetchMatches = async () => {
    loading.value = true
    try {
        const response = await axios.get('/matches.json')
        matches.value = response.data.map(m => ({
           id: m.id,
           date: m.date,
           time: m.time,
           home_team: m.home_team,
           away_team: m.away_team,
           scoreText: `${m.home_score ?? '-'} : ${m.away_score ?? '-'}` 
        }))
        console.log(matches.value)
    } catch (err) {
        console.log(err)
    } finally {
        loading.value = false
    }
}

const filteredMatches = computed(() => {
  let result = [...matches.value]

  if (search.value) {
    const query = search.value.toLowerCase()
    result = result.filter(m =>
      m.home_team.toLowerCase().includes(query) ||
      m.away_team.toLowerCase().includes(query)
    )
  }

   if (dateFrom.value) {
    const fromStr = new Date(dateFrom.value).toISOString().slice(0, 10)
    result = result.filter(m => m.date >= fromStr)
  }

  // Фильтр по дате "до" — включаем граничную дату
  if (dateTo.value) {
    const toDate = new Date(dateTo.value)
    toDate.setHours(23, 59, 59, 999)  // конец дня
    result = result.filter(m => {
      const matchDate = new Date(m.date)
      matchDate.setHours(0, 0, 0, 0)
      return matchDate <= toDate
    })
  }

  return result
})

onMounted(() => {
    fetchMatches()
})

</script>