const LogoutModule = {
  state: {},
  mutations: {},
  actions: {
    'logout/ON_SUBMIT' ({commit}) {
      return new Promise((resolve) => {
        commit('user/ON_LOGOUT_SUCCESSFUL')
        window.localStorage.removeItem('token')
        resolve()
      })
    }
  }
}

export default LogoutModule
