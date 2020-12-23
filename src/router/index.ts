import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/history',
    name: 'History',
    component: () => import(/* webpackChunkName: "about" */ '../views/History.vue')
  },
  {
    path: '/history/selected',
    name: 'HistorySelected',
    component: () => import(/* webpackChunkName: "about" */ '../views/HistorySelected.vue')
  },
  {
    path: '/history/removed',
    name: 'HistoryRemoved',
    component: () => import(/* webpackChunkName: "about" */ '../views/HistoryRemoved.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
