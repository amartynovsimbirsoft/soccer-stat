import { createRouter, createWebHistory } from 'vue-router'
import LeaguesPage from '../views/LeaguesPage.vue'
import MatchesPage from '../views/MatchesPage.vue'

const routes = [
  { path: '/', component: LeaguesPage },
  { path: '/match/:id', component: MatchesPage }
]

export default createRouter({
  history: createWebHistory(),
  routes
})