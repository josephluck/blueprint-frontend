const UserModule = {
  state: {
    details: {}
  },
  mutations: {
    'user/ON_LOGIN_SUCCESSFUL' (state, details) {
      state.details = details
    },
    'user/ON_LOGOUT_SUCCESSFUL' (state) {
      state.details = {}
    }
  },
  actions: {}
}

export default UserModule
