// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource'
Vue.use(VueResource)

import routes from './routes'
const router = new VueRouter({
  mode: 'history',
  routes
})

import { sync } from 'vuex-router-sync'
import store from './store'
sync(store, router)

new Vue({
  http: {
    headers: {
      Authorization: window.localStorage.getItem('token') || null
    }
  },
  router,
  store,
  render: h => h(require('./App.vue'))
}).$mount('#app')
