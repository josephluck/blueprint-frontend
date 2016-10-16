import Vue from 'vue'
import Urls from '../../api/urls'
import Sockets from '../../api/sockets'

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
    },
    'resources/ERROR' (state, error) {
      state.loading = false
      console.error(error)
    },
    'resources/RECEIVE_RESOURCE' (state, resource) {
      state.resources.push(resource)
      state.loading = false
    }
  },
  actions: {
    'resources/GET_RESOURCES' ({commit}) {
      commit('resources/GET_RESOURCES')
      Vue.http.get(Urls.resources())
        .then(response => commit('resources/RECEIVE_RESOURCES', response.body.data))
        .catch(response => commit('resources/ERROR', response.body))
    },
    'resources/SETUP_SOCKETS' ({commit}) {
      Sockets.on('resources created', resource => commit('resources/RECEIVE_RESOURCE', resource))
    },
    'resources/SAVE_NEW_RESOURCE' ({commit}, payload) {
      Vue.http.post(Urls.resources(), payload)
    }
  }
}

export default TodosModule
