import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Импортируем настроенный роутер

const app = createApp(App)

app.use(router) // Используем роутер в приложении
app.mount('#app')

