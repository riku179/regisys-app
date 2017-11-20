import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Logout from '@/views/Logout'
import Tags from '@/views/Tags'
import Root from '@/views/Root'
import Home from '@/views/root/Home'
import ItemsList from '@/views/root/Items/List'
import ItemsCreate from '@/views/root/Items/Create'
import ItemsEdit from '@/views/root/Items/Edit'
import OrdersList from '@/views/root/Orders/List'
import OrdersSales from '@/views/root/Orders/Sales'
import Register from '@/views/root/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Root,
      redirect: '/home',
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
          path: '/items',
          component: ItemsList,
          meta: {
            title: 'Items',
            icon: 'el-icon-goods'
          }
        },
        {
          path: '/items/edit/:id',
          component: ItemsEdit
        },
        {
          path: '/items/create',
          component: ItemsCreate
        },
        {
          path: '/orders',
          component: OrdersList,
          meta: {
            title: 'Orders',
            icon: 'el-icon-refresh'
          }
        },
        {
          path: '/orders/sales',
          component: OrdersSales
        },
        {
          path: '/register',
          component: Register,
          meta: {
            title: 'Register',
            icon: 'el-icon-circle-check-outline',
            staff_only: true
          }
        }
      ]
    },
    {
      path: '/tags',
      component: Tags
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
      path: '',
      redirect: '/home'
    }
  ]
})
