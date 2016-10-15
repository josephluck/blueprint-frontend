import Vue from 'vue'
import Urls from '../../api/urls'

const TodosModule = {
  state: {
    resources: [],
    loading: false
  },
  mutations: {
    'resources/GET_RESOURCES' (state) {
      state.loading = true
    },
    'resources/RECEIVE_RESOURCES' (state, resources) {
      state.resources = resources
      state.loading = false
    }
  },
  actions: {
    'resources/GET_RESOURCES' ({commit}) {
      commit('resources/GET_RESOURCES')
      Vue.http.get(Urls.resources())
      .then((response) => {
        console.log(response)
        commit('resources/RECEIVE_RESOURCES', response.body.data)
      })
    }
  }
}

export default TodosModule
