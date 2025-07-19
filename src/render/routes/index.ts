import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/render/views/home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
  // 添加更多路由
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
