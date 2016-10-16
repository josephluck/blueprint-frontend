import Vue from 'vue'
import Urls from '../../api/urls'

const SignupModule = {
  state: {
    submitting: false,
    error: true,
    errorMessage: ''
  },
  mutations: {
    'signup/ON_SUBMIT' (state) {
      state.submitting = true
      state.error = false
      state.errorMessage = ''
    },
    'signup/ON_SUCCESS' (state) {
      state.submitting = false
    },
    'signup/ON_ERROR' (state, error) {
      state.submitting = false
      state.error = true
      state.errorMessage = error.message
    }
  },
  actions: {
    'signup/ON_SUBMIT' ({commit}, payload) {
      return new Promise((resolve, reject) => {
        commit('signup/ON_SUBMIT')
        Vue.http.post(Urls.signup(), payload)
        .then((response) => {
          commit('signup/ON_SUCCESS')
          resolve()
        })
        .catch((response) => {
          commit('signup/ON_ERROR', response.body)
          reject()
        })
      })
    }
  }
}

export default SignupModule
