import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Logout from '@/views/Logout'
import Root from '@/views/Root'
import Home from '@/views/root/Home'
import Goods from '@/views/root/Goods'
import Orders from '@/views/root/Orders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Root,
      children: [
        {
          path: '/home',
          component: Home,
          meta: {
            title: 'Home',
            icon: 'el-icon-menu'
          }
        },
        {
          path: '/goods',
          component: Goods,
          meta: {
            title: 'Goods',
            icon: 'el-icon-goods'
          }
        },
        {
          path: '/orders',
          component: Orders,
          meta: {
            title: 'Orders',
            icon: 'el-icon-refresh'
          }
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/logout',
      component: Logout
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
