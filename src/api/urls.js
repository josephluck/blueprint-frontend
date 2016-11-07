const API_ROOT = 'http://localhost:3030/admin'

export default {
  login () { return `${API_ROOT}/auth/local` },
  projects (page) { return `${API_ROOT}/projects?$skip=${(page - 1) * 5}` },
  project (projectId) { return `${API_ROOT}/projects/${projectId}` },
  resources () { return `${API_ROOT}/resources` },
  signup () { return `${API_ROOT}/signup` }
}
