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
      setTimeout(() => {
        commit('resources/RECEIVE_RESOURCES', [
          {
            name: 'Resource name'
          }
        ])
      }, 2000)
    }
  }
}

export default TodosModule
