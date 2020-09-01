import Vue from 'vue'
import VueRouter from 'vue-router'
import Echarts from '../views/Echarts.vue'
import VueNotes from '../docs/VueNotes.md'
import DelphiNotes from '../docs/DelphiNotes.md'
import MarkdownNotes from '../docs/MarkdownNotes.md'
import Login from '../views/Login.vue'
import BlogDetail from '../views/BlogDetail.vue'
import BlogEdit from '../views/BlogEdit.vue'

// 解决路由重复报错 Avoided redundant navigation to current location: "/vue".
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: {name: 'BlogList'}
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
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blogList',
    name: 'BlogList',
    // 懒加载
    component: () => import('../views/BlogList.vue')
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
