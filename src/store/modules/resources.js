// import Vue from 'vue'
// import Urls from '../../api/urls'
import io from 'socket.io-client'

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
      console.warn(error)
    },
    'resources/RECEIVE_RESOURCE' (state, resource) {
      state.resources.push(resource)
      state.loading = false
    }
  },
  actions: {
    'resources/GET_RESOURCES' ({commit}) {
      commit('resources/GET_RESOURCES')
      const socket = io('http://localhost:3030/')
      socket.on('resources created', (resource) => {
        commit('resources/RECEIVE_RESOURCE', resource)
      })
      // Vue.http.get(Urls.resources())
      // .then((response) => {
      //   console.log(response)
      //   commit('resources/RECEIVE_RESOURCES', response.body.data)
      // })
      // .catch((response) => {
      //   commit('resources/ERROR', response.body)
      // })
    }
  }
}

export default TodosModule
