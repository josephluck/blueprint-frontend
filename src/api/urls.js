const API_ROOT = 'http://localhost:3030'

export default {
  login () { return `${API_ROOT}/auth/local` },
  projects () { return `${API_ROOT}/projects` },
  resources () { return `${API_ROOT}/resources` },
  signup () { return `${API_ROOT}/signup` }
}
