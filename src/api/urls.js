let INTERNAL_API_ROOT = 'http://localhost:3030/admin'
let PUBLIC_API_ROOT = 'http://localhost:3030/api'
if (process.env.NODE_ENV === 'production') {
  INTERNAL_API_ROOT = 'https://blueprint-api.herokuapp.com/admin'
  PUBLIC_API_ROOT = 'https://blueprint-api.herokuapp.com/api'
}

export const publicApiRoot = PUBLIC_API_ROOT

export default {
  collaborators () { return `${INTERNAL_API_ROOT}/collaborators` },
  collaborator (collaboratorId) { return `${INTERNAL_API_ROOT}/collaborators/${collaboratorId}` },
  login () { return `${INTERNAL_API_ROOT}/auth/local` },
  signup () { return `${INTERNAL_API_ROOT}/signup` },
  projects () { return `${INTERNAL_API_ROOT}/projects` },
  project (projectId) { return `${INTERNAL_API_ROOT}/projects/${projectId}` },
  user (userId) { return `${INTERNAL_API_ROOT}/users/${userId}` }
}
