import Vue from 'vue'

export default {
  init () {
    Vue.http.interceptors.push((request, next) => {
      next((response) => {
        if (response.status === 401) {
          console.info('Log the user out, they arent authenticated')
        }
      })
    })
  }
}
