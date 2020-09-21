import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import BlogDetail from '../views/BlogDetail.vue'
import BlogEdit from '../views/BlogEdit.vue'
import Echarts from '../views/Echarts.vue';

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
    redirect: {name: 'Blogs'}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blogs',
    name: 'Blogs',
    // 懒加载
    component: () => import('../views/Blogs.vue')
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
  },
  {
    path: '/echarts',
    name: 'Echarts',
    // meta: {
    //   requireAuth: true
    // },
    component: Echarts
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
