const UserModule = {
  state: {
    details: {}
  },
  mutations: {
    'user/ON_LOGIN' (state, details) {
      state.details = details
    }
  },
  actions: {}
}

export default UserModule
