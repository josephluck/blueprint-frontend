import Vue from 'vue'
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
      Vue.http.post(Urls.login(), payload).then((response) => {
        commit('login/ON_SUCCESS')
        commit('user/ON_LOGIN', response.data)
        // Set token on all requests by default
        Vue.http.headers.common['Authorization'] = response.token
        // Persist token in localStorage so the user doesn't have
        // to log in every time they open the app
        window.localStorage.setItem('token', response.token)
      }).catch(() => {
        commit('login/ON_ERROR')
      })
    }
  }
}

export default LoginModule
