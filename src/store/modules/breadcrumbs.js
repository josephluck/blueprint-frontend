const BreadcrumbsModule = {
  state: {
    breadcrumbs: []
  },
  mutations: {
    'breadcrumbs/SET' (state, breadcrumbs) {
      state.breadcrumbs = breadcrumbs
    }
  },
  actions: {
    'breadcrumbs/SET' ({commit}, payload) {
      commit('breadcrumbs/SET', payload)
    }
  }
}

export default BreadcrumbsModule
