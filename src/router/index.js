import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'search',
        component: () => import('@/views/Search.vue')
      },
      {
        path: 'check-out',
        component: () => import('@/views/CheckOut.vue')
      },
      {
        path: 'product/:id',
        component: () => import('@/views/Product.vue')
      },
      {
        path: 'detail/:id',
        component: () => import('@/views/Details.vue')
      },
      {
        path: 'cart',
        component: () => import('@/views/Cart.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/Profile.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

