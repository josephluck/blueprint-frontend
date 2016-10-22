import Vue from 'vue'
import Urls from '../../api/urls'
import Sockets from '../../api/sockets'

const ProjectsModule = {
  state: {
    project: {},
    loading: false
  },
  mutations: {
    'project/GET_PROJECT' (state) {
      state.loading = true
    },
    'project/RECEIVE_PROJECT' (state, project) {
      state.project = project
      state.loading = false
    },
    'project/RECEIVE_PROJECT_UPDATE' (state, project) {
      state.project = project
      state.loading = false
    },
    'project/ERROR' (state, error) {
      state.loading = false
    }
  },
  actions: {
    'project/GET_PROJECT' ({commit}, projectId) {
      commit('project/GET_PROJECT')

      return new Promise((resolve, reject) => {
        Vue.http.get(Urls.project(projectId)).then(response => {
          commit('project/RECEIVE_PROJECT', response.body)
          resolve(response.body)
        }).catch(response => {
          commit('project/ERROR', response.body)
          reject(response.body)
        })
      })
    },
    'project/SETUP_SOCKETS' ({commit}, projectId) {
      Sockets.on('project updated', project => {
        if (project.id === projectId) {
          commit('project/RECEIVE_PROJECT_UPDATE', project)
        }
      })
    }
  }
}

export default ProjectsModule
