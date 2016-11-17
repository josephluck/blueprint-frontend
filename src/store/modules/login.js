import Vue from 'vue'
import Urls from '../../api/urls'

const LoginModule = {
  state: {},
  mutations: {},
  actions: {
    'login/ON_SUBMIT' ({commit}, payload) {
      return new Promise((resolve, reject) => {
        Vue.http.post(Urls.login(), payload)
        .then((response) => {
          commit('user/ON_LOGIN_SUCCESSFUL', response.body.data)
          window.localStorage.setItem('token', response.body.token)
          resolve()
        }, () => {
          reject()
        })
      })
    }
  }
}

export default LoginModule
