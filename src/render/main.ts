import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './routes'

const app = createApp(App)
const pinia = createPinia()

app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')
