import Vue from 'vue'
import Urls from '../../api/urls'
import Sockets from '../../api/sockets'

const ProjectsModule = {
  state: {
    project: {},
    loading: false,
    saveError: null
  },
  mutations: {
    'project/GET_PROJECT' (state) {
      state.loading = true
    },
    'project/SAVE_STARTED' (state) {
      state.saving = true
      state.saveError = null
    },
    'project/SAVE_SUCCESSFUL' (state) {
      state.saving = false
    },
    'project/SAVE_ERROR' (state, payload) {
      state.saving = false
      state.saveError = payload
    },
    'project/RECEIVE_PROJECT' (state, project) {
      state.project = project
      state.loading = false
    },
    'project/RECEIVE_PROJECT_UPDATE' (state, project) {
      state.project = {
        ...state.project,
        ...project
      }
      state.loading = false
    },
    'project/ERROR' (state, error) {
      state.loading = false
    },
    'project/form/TOGGLE_RESOURCE_HIDDEN' (state, resourceIndex) {
      // We have to use Vue.set here since 'hidden' is a key that does not exist on the object
      Vue.set(state.project.resources[resourceIndex], 'hidden', !state.project.resources[resourceIndex].hidden)
    },
    'project/form/TOGGLE_MODEL_HIDDEN' (state, {resourceIndex, modelIndex}) {
      // We have to use Vue.set here since 'hidden' is a key that does not exist on the object
      Vue.set(state.project.resources[resourceIndex].model[modelIndex], 'hidden', !state.project.resources[resourceIndex].model[modelIndex].hidden)
    },
    'project/form/UPDATE_RESOURCE' (state, {resourceIndex, name, value}) {
      state.project.resources[resourceIndex][name] = value
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
    },
    'project/SAVE' ({state, commit}, projectId) {
      commit('project/SAVE_STARTED')
      return new Promise((resolve, reject) => {
        Vue.http.put(Urls.project(projectId), state.project).then(response => {
          commit('project/SAVE_SUCCESSFUL')
          resolve(response.body)
        }).catch(response => {
          commit('project/SAVE_ERROR', response.body)
          reject(response.body)
        })
      })
    }
  }
}

export default ProjectsModule
