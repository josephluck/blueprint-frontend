import Vue from 'vue'
import Urls from '../../api/urls'

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
    },
    'user/UPDATE_SUCCESSFUL' (state, details) {
      state.details = details
      window.localStorage.setItem('user', JSON.stringify(details))
    },
    'user/form/UPDATE_DETAILS' (state, { name, value }) {
      Vue.set(state.details, name, value)
    }
  },
  actions: {
    'user/UPDATE' ({state, commit}) {
      return new Promise((resolve, reject) => {
        Vue.http.put(Urls.user(state.details._id), state.details).then((response) => {
          commit('user/UPDATE_SUCCESSFUL', response.body)
          resolve(response.body)
        }, () => {
          reject()
        })
      })
    },
    'user/DELETE' ({state, commit, dispatch}) {
      return new Promise((resolve, reject) => {
        Vue.http.delete(Urls.user(state.details._id)).then(() => {
          dispatch('logout/ON_SUBMIT').then(() => {
            resolve()
          })
        }, () => {
          reject()
        })
      })
    }
  }
}

export default UserModule
