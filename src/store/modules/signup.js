import Vue from 'vue'
import Urls from '../../api/urls'

const SignupModule = {
  state: {},
  mutations: {},
  actions: {
    'signup/ON_SUBMIT' ({commit}, payload) {
      return new Promise((resolve, reject) => {
        Vue.http.post(Urls.signup(), payload).then(() => {
          resolve()
        })
        .catch(() => {
          reject()
        })
      })
    }
  }
}

export default SignupModule
