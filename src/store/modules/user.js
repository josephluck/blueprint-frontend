const UserModule = {
  state: {
    details: {}
  },
  mutations: {
    'user/ON_LOGIN' (state, details) {
      state.details = details
    },
    'user/ON_LOGOUT' (state) {
      state.details = {}
    }
  },
  actions: {}
}

export default UserModule
