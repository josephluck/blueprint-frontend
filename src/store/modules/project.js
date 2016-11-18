import Vue from 'vue'
import Urls from '../../api/urls'

const ProjectsModule = {
  state: {
    project: {},
    hiddenResources: {},
    hiddenModels: {},
    currentlyDeletingCollaborator: {
      user: {}
    }
  },
  mutations: {
    'project/RECEIVE_PROJECT' (state, project) {
      state.project = { ...project }
    },
    'project/RECEIVE_PROJECT_UPDATE' (state, project) {
      // This shouldnt update the project if a PUT is pending
      // state.project = { ...project }
    },
    'project/ERROR' (state, error) {
      state.project = {}
    },
    'project/SAVE_SUCCESSFUL' (state, payload) {
      state.project = payload
    },
    'project/DELETE_SUCCESSFUL' (state, projectId) {
      state.project = {}
    },
    'project/form/ADD_MODEL_KEY' (state, {resourceIndex}) {
      state.project.resources[resourceIndex].model.push({
        randomParams: {}
      })
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
    'project/ADD_NEW_COLLABORATOR_SUCCESSFUL' (state, collaborator) {
      state.project.collaborators.push(collaborator)
    },
    'project/DELETE_COLLABORATOR_SUCCESSFUL' (state, collaboratorId) {
      let collaboratorIndex = state.project.collaborators.findIndex((collaborator) => collaborator._id === collaboratorId)
      state.project.collaborators.splice(collaboratorIndex, 1)
    },
    'user/UPDATE_SUCCESSFUL' (state, details) {
      let foundCollaborator = state.project.collaborators.find((collaborator) => collaborator.userId === details._id)
      if (foundCollaborator) {
        Vue.set(foundCollaborator, 'user', details)
      }
    },
    'project/form/REMOVE_RESOURCE' (state, {resourceIndex}) {
      state.project.resources.splice(resourceIndex, 1)
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
    'project/form/UPDATE_PROJECT' (state, {name, value}) {
      Vue.set(state.project, name, value)
    },
    'project/form/UPDATE_RESOURCE' (state, {resourceIndex, name, value}) {
      let objToUpdate = state.project.resources[resourceIndex]
      Vue.set(objToUpdate, name, value)
    },
    'project/form/UPDATE_RESOURCE_SUPPORTED_METHODS' (state, {resourceIndex, name, value}) {
      let objToUpdate = state.project.resources[resourceIndex].supportedMethods
      Vue.set(objToUpdate, name, value)
    },
    'project/form/UPDATE_MODEL' (state, {resourceIndex, modelIndex, name, value}) {
      let objToUpdate = state.project.resources[resourceIndex].model[modelIndex]
      Vue.set(objToUpdate, name, value)
    },
    'project/form/UPDATE_MODEL_RANDOM_PARAMS' (state, {resourceIndex, modelIndex, name, value}) {
      let objToUpdate = state.project.resources[resourceIndex].model[modelIndex].randomParams
      Vue.set(objToUpdate, name, value)
    },
    'project/form/SET_CURRENT_DELETE_COLLABORATOR' (state, collaboratorId) {
      let collaborator = state.project.collaborators.find((collaborator) => {
        return collaborator._id === collaboratorId
      })
      state.currentlyDeletingCollaborator = collaborator
    }
  },
  actions: {
    'project/GET_PROJECT' ({commit}, projectId) {
      return new Promise((resolve, reject) => {
        Vue.http.get(Urls.project(projectId)).then(response => {
          commit('project/RECEIVE_PROJECT', response.body)
          resolve(response.body)
        }).catch(() => {
          commit('project/ERROR')
          reject()
        })
      })
    },
    'project/SAVE' ({state, commit}, projectId) {
      return new Promise((resolve, reject) => {
        Vue.http.put(Urls.project(projectId), state.project).then(response => {
          commit('project/SAVE_SUCCESSFUL', response.body)
          resolve(response.body)
        }).catch(() => {
          reject()
        })
      })
    },
    'project/DELETE' ({state, commit}, projectId) {
      return new Promise((resolve, reject) => {
        Vue.http.delete(Urls.project(projectId)).then(response => {
          commit('project/DELETE_SUCCESSFUL', projectId)
          resolve(projectId)
        }).catch(() => {
          reject(projectId)
        })
      })
    },
    'project/ADD_NEW_COLLABORATOR' ({state, commit}, {projectId, collaborator}) {
      return new Promise((resolve, reject) => {
        Vue.http.post(Urls.collaborators(), {
          projectId,
          email: collaborator.email
        }).then(response => {
          commit('project/ADD_NEW_COLLABORATOR_SUCCESSFUL', response.body)
          resolve(response.body)
        }).catch(() => {
          reject()
        })
      })
    },
    'project/DELETE_COLLABORATOR' ({state, commit}, {collaboratorId}) {
      return new Promise((resolve, reject) => {
        Vue.http.delete(Urls.collaborator(collaboratorId)).then(response => {
          commit('project/DELETE_COLLABORATOR_SUCCESSFUL', collaboratorId)
          resolve(response.body)
        }).catch(() => {
          reject()
        })
      })
    }
  }
}

export default ProjectsModule
