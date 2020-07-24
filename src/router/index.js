import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Echarts from '../views/Echarts.vue'
import Notes from '../views/Notes.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/echarts',
    name: 'Echarts',
    component: Echarts
  },
  {
    path: '/notes',
    name: 'Notes',
    component: Notes
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
