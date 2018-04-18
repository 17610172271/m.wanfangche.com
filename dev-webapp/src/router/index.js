import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

const Login = resolve => require(['@/views/Login'], resolve) // 登录
const Register = resolve => require(['@/views/Register'], resolve) // 注册
const NotFound = resolve => require(['@/views/err/index'], resolve) // 404

import Home from '@/views/feed/home' // 首页
import UserRoutes from './user'
import RentalRoutes from './rental'
import FeedRoutes from './feed'

import DemoRoutes from '@/demo/routes'

import VuePreview from 'vue-preview'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// 路由区块

Vue.use(Router)
Vue.use(VuePreview)
Vue.use(VueAwesomeSwiper)

const router = new Router({
  mode: 'history',
  routes: [
    DemoRoutes,
    UserRoutes,
    ...RentalRoutes,
    ...FeedRoutes,
    {
      path: '/login',
      component: Login,
      name: 'user_login'
    },
    {
      path: '/register',
      component: Register,
      name: 'user_register'
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {keepAlive: true}
    },
    { path: '*', component: NotFound }
  ]
})
// auth required ?
// check route meta before route change
// if route require auth, check login status
// redirect to login page if loggedin is not defined

router.beforeEach((to, from, next) => {
  // 判断去往的页面是否需要登录
  if (to.matched.some(record => record.meta.requireAuth) && !store.getters.isLoggedin) {
    next({
      path: '/login', // 未登录时跳转到该页面
      query: { from: to.fullPath }
    })
  } else {
    next()
  }
})
export default router
