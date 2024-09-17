import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { registerElements } from './components/registerElements'
import App from './App.vue'
import router from './router'

const app = createApp(App)
registerElements(app)
app.use(createPinia())
app.use(router)

app.mount('#app')
