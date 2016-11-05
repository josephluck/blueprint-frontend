import Vue from 'vue'
import Urls from '../../api/urls'
import Sockets from '../../api/sockets'

const ProjectsModule = {
  state: {
    project: {},
    loading: false,
    saveError: null,
    hiddenResources: {},
    hiddenModels: {}
  },
  mutations: {
    'project/GET_PROJECT' (state) {
      state.loading = true
    },
    'project/RECEIVE_PROJECT' (state, project) {
      state.project = {
        ...project
      }
      state.loading = false
    },
    'project/RECEIVE_PROJECT_UPDATE' (state, project) {
      state.project = {
        ...project
      }
      state.loading = false
    },
    'project/ERROR' (state, error) {
      state.loading = false
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
    'project/form/TOGGLE_RESOURCE_HIDDEN' (state, resourceIndex) {
      // We have to use Vue.set here since the resourceIndex may not exist in the store
      Vue.set(state.hiddenResources, resourceIndex, !state.hiddenResources[resourceIndex])
    },
    'project/form/TOGGLE_MODEL_HIDDEN' (state, {resourceIndex, modelIndex}) {
      // We have to use Vue.set here since the resourceIndex / modelIndex may not exist in the store
      const key = `${resourceIndex}-${modelIndex}`
      Vue.set(state.hiddenModels, key, !state.hiddenModels[key])
    },
    'project/form/UPDATE_RESOURCE' (state, {resourceIndex, name, value}) {
      state.project.resources[resourceIndex][name] = value
    },
    'project/form/UPDATE_RESOURCE_SUPPORTED_METHODS' (state, {resourceIndex, name, value}) {
      state.project.resources[resourceIndex].supportedMethods[name] = value
    },
    'project/form/UPDATE_MODEL' (state, {resourceIndex, modelIndex, name, value}) {
      state.project.resources[resourceIndex].model[modelIndex][name] = value
    },
    'project/form/ADD_MODEL_KEY' (state, {resourceIndex}) {
      state.project.resources[resourceIndex].model.push({})
    },
    'project/form/REMOVE_MODEL_KEY' (state, {resourceIndex, modelIndex}) {
      state.project.resources[resourceIndex].model.splice(modelIndex, 1)
    },
    'project/form/ADD_RESOURCE' (state) {
      state.project.resources.push({
        supportedMethods: {},
        model: []
      })
    },
    'project/form/REMOVE_RESOURCE' (state, {resourceIndex}) {
      state.project.resources.splice(resourceIndex, 1)
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
      Sockets.on('projects updated', project => {
        if (project._id === projectId) {
          commit('project/RECEIVE_PROJECT_UPDATE', project)
        }
      })
    },
    'project/SAVE' ({state, commit}, projectId) {
      commit('project/SAVE_STARTED')
      return new Promise((resolve, reject) => {
        Vue.http.put(Urls.project(projectId), state.project).then(response => {
          commit('project/SAVE_SUCCESSFUL', response.body)
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
