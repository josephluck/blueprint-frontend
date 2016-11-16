let ADMIN_API_ROOT = 'http://localhost:3030/admin'
let PUBLIC_API_ROOT = 'http://localhost:3030/api'
if (process.env.NODE_ENV === 'production') {
  ADMIN_API_ROOT = 'https://blueprint-api.herokuapp.com/admin'
  PUBLIC_API_ROOT = 'https://blueprint-api.herokuapp.com/api'
}

export const publicApiRoot = PUBLIC_API_ROOT

export default {
  login () { return `${ADMIN_API_ROOT}/auth/local` },
  signup () { return `${ADMIN_API_ROOT}/signup` },
  projects () { return `${ADMIN_API_ROOT}/projects` },
  project (projectId) { return `${ADMIN_API_ROOT}/projects/${projectId}` },
  collaborators () { return `${ADMIN_API_ROOT}/collaborators` },
  collaborator (collaboratorId) { return `${ADMIN_API_ROOT}/collaborators/${collaboratorId}` }
}
