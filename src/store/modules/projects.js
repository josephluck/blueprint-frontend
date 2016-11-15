import Vue from 'vue'
import Urls from '../../api/urls'
import Sockets from '../../api/sockets'

const ProjectsModule = {
  state: {
    projects: [],
    loading: false
  },
  mutations: {
    'projects/GET_PROJECTS_STARTED' (state) {
      state.loading = true
    },
    'projects/GET_PROJECTS_ERROR' (state, error) {
      state.loading = false
    },
    'projects/GET_PROJECTS_SUCCESS' (state, projects) {
      state.projects = projects
      state.projectMenuItemOpen = projects[0]._id
      state.loading = false
    },
    'projects/RECEIVE_PROJECT' (state, project) {
      const projectAlreadyExists = state.projects.find((proj) => proj._id === project._id)
      state.projectMenuItemOpen = project._id
      state.loading = false
      if (!projectAlreadyExists) {
        state.projects.unshift(project)
      }
    },
    'project/SAVE_SUCCESSFUL' (state, project) {
      state.projects = state.projects.map((proj) => {
        if (proj._id === project._id) {
          proj = project
        }
        return proj
      })
    },
    'project/DELETE_SUCCESSFUL' (state, projectId) {
      state.projects = state.projects.filter((proj) => proj._id !== projectId)
    }
  },
  actions: {
    'projects/GET_PROJECTS' ({commit}) {
      commit('projects/GET_PROJECTS_STARTED')
      Vue.http.get(Urls.projects())
        .then(response => commit('projects/GET_PROJECTS_SUCCESS', response.body))
        .catch(response => commit('projects/GET_PROJECTS_ERROR', response.body))
    },
    'projects/SETUP_SOCKETS' ({commit}) {
      Sockets.on('projects created', project => commit('projects/RECEIVE_PROJECT', project))
    },
    'projects/ADD_NEW' ({commit}, payload) {
      return new Promise((resolve, reject) => {
        Vue.http.post(Urls.projects(), payload).then((response) => {
          commit('projects/RECEIVE_PROJECT', response.body)
          resolve(response.body._id)
        }).catch((response) => {
          reject()
        })
      })
    }
  }
}

export default ProjectsModule
