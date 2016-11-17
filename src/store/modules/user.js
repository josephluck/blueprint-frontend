const UserModule = {
  state: {
    details: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : {}
  },
  mutations: {
    'user/ON_LOGIN_SUCCESSFUL' (state, details) {
      state.details = details
      window.localStorage.setItem('user', JSON.stringify(details))
    },
    'user/ON_LOGOUT_SUCCESSFUL' (state) {
      state.details = {}
      window.localStorage.removeItem('user')
    }
  },
  actions: {}
}

export default UserModule
