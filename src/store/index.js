import Vue from 'vue'
import Vuex from 'vuex'
import PersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    breadcrumbs: require('./modules/breadcrumbs').default,
    login: require('./modules/login').default,
    logout: require('./modules/logout').default,
    projects: require('./modules/projects').default,
    project: require('./modules/project').default,
    resources: require('./modules/resources').default,
    signup: require('./modules/signup').default,
    todos: require('./modules/todos').default,
    user: require('./modules/user').default,
    ui: require('./modules/ui').default
  },
  strict: true,
  plugins: [
    PersistedState()
  ]
})

// process.env.NODE_ENV !== 'production'

export default Store
