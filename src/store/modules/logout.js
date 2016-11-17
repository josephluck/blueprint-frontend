const LogoutModule = {
  state: {},
  mutations: {
    'user/ON_LOGOUT_SUCCESSFUL' (state) {
      window.localStorage.removeItem('token')
    }
  },
  actions: {
    'logout/ON_SUBMIT' ({commit}) {
      return new Promise((resolve) => {
        commit('user/ON_LOGOUT_SUCCESSFUL')
        resolve()
      })
    }
  }
}

export default LogoutModule
