import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Logout from '@/views/Logout'
import Root from '@/views/Root'
import Home from '@/views/root/Home'
import ItemsList from '@/views/root/Items/List'
import ItemsCreate from '@/views/root/Items/Create'
import ItemsEdit from '@/views/root/Items/Edit'
import Orders from '@/views/root/Orders'

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
      path: '',
      redirect: '/home'
    }
  ]
})
