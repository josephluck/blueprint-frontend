import Vue from 'vue'

export default {
  init () {
    Vue.http.interceptors.push((request, next) => {
      const token = window.localStorage.getItem('token')
      if (token) {
        request.headers.set('Authorization', token)
      } else if (!request.url.includes('auth') && !request.url.includes('signup')) {
        // Redirect user to login screen if they aren't authenticated
        window.location.pathname = '/login'
      }
      next((response) => {
        if (response.status === 401) {
          console.info('Log the user out, they arent authenticated')
        }
      })
    })
  }
}
