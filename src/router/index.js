import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    meta: { show: false }
  },
  {
    path: '/register',
    component: () => import('@/views/Register.vue'),
    meta: { show: false }
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
        path: '/home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: '/search',
        component: () => import('@/views/Search.vue'),
        meta: { show: true }
      },
      {
        path: '/check-out',
        component: () => import('@/views/CheckOut.vue'),
        meta: { show: true }
      },
      {
        path: '/product/:id',
        component: () => import('@/views/Product.vue'),
        meta: { show: true }
      },
      {
        path: '/detail/:id',
        component: () => import('@/views/Details.vue'),
        meta: { show: true }
      },
      {
        path: '/cart',
        component: () => import('@/views/Cart.vue'),
      },
      {
        path: '/profile',
        component: () => import('@/views/Profile.vue'),
      },
      {
        path: '/my-order',
        component: () => import('@/views/TheOrder.vue'),
        meta: { show: true }
      },
      {
        path: '/rating/:id',
        component: () => import('@/views/Rating.vue'),
        meta: { show: true }
      },
    ]
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

