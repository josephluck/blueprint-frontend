import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import todos from './modules/todos'

const Store = new Vuex.Store({
  modules: {
    todos
  },
  strict: process.env.NODE_ENV !== 'production'
})

export default Store
