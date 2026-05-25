<template>
  <div class="match-card">
    <div class="teams">
      <span class="home">{{ homeTeam }}</span>
      <span class="score">{{ homeScore }} : {{ awayScore }}</span>
      <span class="away">{{ awayTeam }}</span>
    </div>
    <div class="status">{{ getStatusText(status) }}</div>
  </div>
</template>

<script setup>
defineProps({
  homeTeam: String,
  awayTeam: String,
  homeScore: Number,
  awayScore: Number,
  status: String
})

const statusTextMap = {
  SCHEDULED: 'Запланирован',
  FINISHED: 'Завершён',
  LIVE: 'Прямой эфир'
}

const getStatusText = (status) => statusTextMap[status] || status
</script>

<style scoped>
.match-card {
  border: 1px solid #ddd;
  padding: 12px;
  margin: 8px;
  border-radius: 8px;
}
.teams {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}
.score {
  margin: 0 20px;
  color: #e67e22;
}
.status {
  font-size: 0.8em;
  color: gray;
  margin-top: 8px;
}
</style>