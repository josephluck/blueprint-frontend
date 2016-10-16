// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Interceptors from './api/interceptors'
import Sockets from './api/sockets'
import Routes from './routes'
import { sync } from 'vuex-router-sync'
import AppStore from './store'

require('./less/index.less')

Vue.use(VueRouter)
Vue.use(VueResource)

const AppRouter = new VueRouter({
  mode: 'history',
  routes: Routes
})

sync(AppStore, AppRouter)

const App = new Vue({
  router: AppRouter,
  store: AppStore,
  render: h => h(require('./App.vue'))
})

Interceptors.init(App)
Sockets.init()

App.$mount('#app')

export default App
