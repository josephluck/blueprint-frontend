import Vue from 'vue'
import Vuex from 'vuex'
// import PersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    login: require('./modules/login').default,
    logout: require('./modules/logout').default,
    project: require('./modules/project').default,
    projects: require('./modules/projects').default,
    signup: require('./modules/signup').default,
    ui: require('./modules/ui').default,
    user: require('./modules/user').default
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    // PersistedState()
  ]
})

export default Store
