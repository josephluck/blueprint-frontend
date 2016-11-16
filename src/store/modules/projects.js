import Vue from 'vue'
import Urls from '../../api/urls'

const ProjectsModule = {
  state: {
    projects: [],
    projectMenuItemOpen: null
  },
  mutations: {
    'projects/GET_PROJECTS_SUCCESS' (state, projects) {
      state.projects = projects
      if (projects.length) {
        state.projectMenuItemOpen = projects[0]._id
      }
    },
    'projects/RECEIVE_PROJECT' (state, project) {
      const projectAlreadyExists = state.projects.find((proj) => proj._id === project._id)
      state.projectMenuItemOpen = project._id
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
      return new Promise((resolve, reject) => {
        Vue.http.get(Urls.projects()).then(response => {
          commit('projects/GET_PROJECTS_SUCCESS', response.body)
          resolve()
        }, () => {
          reject()
        })
      })
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
