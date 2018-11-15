// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '../my-theme/index.less'
import './assets/style/public.css'
import Util from './libs/util'
import http from './libs/http'
import lodash from './libs/lodash'
import moment from 'moment'

Object.defineProperties(Vue.prototype, {
  '$moment': {
    get: () => moment
  },
  '$axios': {
    get: () => http
  }
})
Vue.use(lodash)
Vue.use(iView)

iView.LoadingBar.config({
  color: '#EEA9A9',
  failedColor: '#f0ad4e',
  height: 4
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  Util.title(to.meta.title)
  let token = window.localStorage.getItem('session-token')
  if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
    next({
      // path: '/login',
      name: 'Login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
