import Vue from 'vue'
import Urls from '../../api/urls'
import Sockets from '../../api/sockets'

const ProjectsModule = {
  state: {
    projects: [],
    loading: false
  },
  mutations: {
    'projects/GET_PROJECTS' (state) {
      state.loading = true
    },
    'projects/GET_PROJECTS_ERROR' (state, error) {
      state.loading = false
    },
    'projects/RECEIVE_PROJECTS' (state, projects) {
      state.projects = projects
      state.loading = false
    },
    'projects/RECEIVE_PROJECT' (state, project) {
      state.projects.unshift(project)
      state.loading = false
    }
  },
  actions: {
    'projects/GET_PROJECTS' ({commit}) {
      commit('projects/GET_PROJECTS')
      Vue.http.get(Urls.projects())
        .then(response => commit('projects/RECEIVE_PROJECTS', response.body.data))
        .catch(response => commit('projects/GET_PROJECTS_ERROR', response.body))
    },
    'projects/SETUP_SOCKETS' ({commit}) {
      Sockets.on('projects created', project => commit('projects/RECEIVE_PROJECT', project))
    },
    'projects/ADD_NEW' ({commit}, payload) {
      return new Promise((resolve, reject) => {
        Vue.http.post(Urls.projects(), payload).then((response) => {
          resolve(response.body._id)
        }).catch((response) => {
          reject()
        })
      })
    }
  }
}

export default ProjectsModule
