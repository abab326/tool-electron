import { createApp } from 'vue'
import 'uno.css'
import '@unocss/reset/tailwind.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './routes'
import store from './stores'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
