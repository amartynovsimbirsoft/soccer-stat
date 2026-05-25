<template>
  <div>
    <MatchCard
      home-team="Зенит"
      away-team="Спартак"
      :home-score="2"
      :away-score="1"
      status="FINISHED"
    />
    <MatchCard
      home-team="Реал"
      away-team="Барселона"
      :home-score="0"
      :away-score="0"
      status="LIVE"
    />
  </div>
</template>

<script setup>
import MatchCard from './components/MatchCard.vue'
</script>