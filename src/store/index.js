import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    todos: require('./modules/todos').default,
    login: require('./modules/login').default,
    user: require('./modules/user').default
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default Store
