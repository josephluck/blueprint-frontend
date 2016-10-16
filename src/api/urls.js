const API_ROOT = 'http://localhost:3030'

export default {
  login () {
    return `${API_ROOT}/auth/local`
  },
  resources () {
    return `${API_ROOT}/resources?$page=2$limit=10`
  }
}
