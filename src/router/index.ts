import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {HistoryActionTypes} from "@/types/history-action-types";

import Home from '../views/Home.vue'
const History = import(/* webpackChunkName: "History" */ '../views/History.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/history',
    name: 'History',
    component: () => History
  },
  {
    path: '/history/selected',
    name: 'HistorySelected',
    component: () => History,
    props: { historyType: HistoryActionTypes.ADD_ACTION }
  },
  {
    path: '/history/removed',
    name: 'HistoryRemoved',
    component: () => History,
    props: { historyType: HistoryActionTypes.REMOVE_ACTION }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
