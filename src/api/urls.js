const API_ROOT = 'http://localhost:3030/admin'

export default {
  login () { return `${API_ROOT}/auth/local` },
  signup () { return `${API_ROOT}/signup` },
  projects () { return `${API_ROOT}/projects` },
  project (projectId) { return `${API_ROOT}/projects/${projectId}` },
  collaborators () { return `${API_ROOT}/collaborators` },
  collaborator (collaboratorId) { return `${API_ROOT}/collaborators/${collaboratorId}` }
}
