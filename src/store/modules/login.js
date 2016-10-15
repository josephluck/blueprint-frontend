import Axios from 'axios'
import Urls from '../../api/urls'

const LoginModule = {
  state: {
    submitting: false
  },
  mutations: {
    'login/ON_SUBMIT' (state) {
      state.submitting = true
    },
    'login/ON_SUCCESS' (state) {
      state.submitting = false
    },
    'login/ON_ERROR' (state) {
      state.submitting = false
    }
  },
  actions: {
    'login/ON_SUBMIT' ({commit}, payload) {
      commit('login/ON_SUBMIT')
      Axios.post(Urls.login(), payload).then((response) => {
        commit('login/ON_SUCCESS')
        commit('user/ON_LOGIN', response.data)
        window.localStorage.setItem('token', response.token)
      }).catch(() => {
        commit('login/ON_ERROR')
      })
    }
  }
}

export default LoginModule
