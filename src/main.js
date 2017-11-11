// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'
import * as auth from './lib/auth'

Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  let token = auth.getToken()
  if (token === null && to.path === '/login') { // pass through to avoid loop
    next()
  } else if (token === null) {
    next('/login')
  } else if (token.isValid() && to.path === '/login') {
    next('/home')
  } else if (!token.isValid()) {
    auth.removeAuthData()
    next('/login')
  } else {
    next()
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
