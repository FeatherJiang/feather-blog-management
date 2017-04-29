// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import es6 from 'es6-promise'
import App from './App'
import router from './router'
import 'assets/stylus/index.styl'

es6.polyfill()

Vue.config.productionTip = false

Vue.prototype.$http = axios.create({
  baseURL: 'http://www.jiangfeather.com'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
