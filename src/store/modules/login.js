import Vue from 'vue'
import Urls from '../../api/urls'

const LoginModule = {
  state: {
    submitting: false,
    error: true,
    errorMessage: ''
  },
  mutations: {
    'login/ON_SUBMIT' (state) {
      state.submitting = true
      state.error = false
      state.errorMessage = ''
    },
    'login/ON_SUCCESS' (state) {
      state.submitting = false
    },
    'login/ON_ERROR' (state, error) {
      state.submitting = false
      state.error = true
      state.errorMessage = error.message
    }
  },
  actions: {
    'login/ON_SUBMIT' ({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('login/ON_SUBMIT')
        Vue.http.post(Urls.login(), payload)
        .then((response) => {
          commit('login/ON_SUCCESS')
          commit('user/ON_LOGIN', response.data)
          // Set token on all requests by default
          Vue.http.headers.common['Authorization'] = response.token
          // Persist token in localStorage so the user doesn't have
          // to log in every time they open the app
          window.localStorage.setItem('token', response.token)
          resolve()
        })
        .catch((response) => {
          commit('login/ON_ERROR', response.body)
          reject()
        })
      })
    }
  }
}

export default LoginModule
