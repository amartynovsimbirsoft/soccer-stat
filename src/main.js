import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Импортируем настроенный роутер
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

const app = createApp(App)
app.use(vuetify)
app.use(router) // Используем роутер в приложении
app.mount('#app')

