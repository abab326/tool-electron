import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/render/layout/default.vue'
import Home from '@/render/views/home.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: Home
      },
      {
        path: '/product-detail',
        name: 'ProductDetail',
        component: () => import('@/render/views/product/detail.vue')
      }
    ]
  }
  // 添加更多路由
]

export default createRouter({
  history: createWebHashHistory(),
  routes
})
