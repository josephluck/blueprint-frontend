import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    login: require('./modules/login').default,
    todos: require('./modules/todos').default,
    user: require('./modules/user').default
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default Store
