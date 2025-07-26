import { createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/global.scss'
import 'uno.css'

import App from './App.vue'
import router from './routes'
import store from './stores'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
