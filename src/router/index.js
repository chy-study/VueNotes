import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Echarts from '../views/Echarts.vue'
import VueNotes from '../docs/VueNotes.md'
import DelphiNotes from '../docs/DelphiNotes.md'
import MarkdownNotes from '../docs/MarkdownNotes.md'

// 解决路由重复报错 Avoided redundant navigation to current location: "/vue".
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

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
    path: '/vue',
    name: 'VueNotes',
    component: VueNotes
  },
  {
    path: '/delphi',
    name: 'DelphiNotes',
    component: DelphiNotes
  },
  {
    path: '/markdown',
    name: 'MarkdownNotes',
    component: MarkdownNotes
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
