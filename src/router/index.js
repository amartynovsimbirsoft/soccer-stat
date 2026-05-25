import { createRouter, createWebHistory } from 'vue-router'
import LeaguesPage from '../views/LeaguesPage.vue'
import LeagueCalendar from '../views/LeagueCalendar.vue'

const routes = [
  { path: '/', component: LeaguesPage },
  { path: '/league/:id', component: LeagueCalendar }
]

export default createRouter({
  history: createWebHistory(),
  routes
})