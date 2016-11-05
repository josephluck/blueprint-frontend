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
      state.project = {
        name: 'goodlord',
        resources: [
          {
            name: 'customers',
            type: 'collection',
            numberOfRecords: 10,
            supportedMethods: {
              get: true,
              post: true,
              put: false,
              delete: false
            },
            model: [
              {
                key: 'first_name',
                type: 'random',
                randomCategory: 'name',
                randomSubcategory: 'firstName'
              },
              {
                key: 'first_name',
                type: 'random',
                randomCategory: 'name',
                randomSubcategory: 'firstName'
              }
            ]
          },
          {
            name: 'settings',
            type: 'record',
            model: [],
            supportedMethods: {}
          }
        ],
        ...project
      }
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
    'project/TOGGLE_RESOURCE_SHOWING' (state, resourceIndex) {
      // We have to use Vue.set here since 'showing' is a key that does not exist on the object
      Vue.set(state.project.resources[resourceIndex], 'showing', !state.project.resources[resourceIndex].showing)
    },
    'project/TOGGLE_MODEL_SHOWING' (state, {resourceIndex, modelIndex}) {
      // We have to use Vue.set here since 'showing' is a key that does not exist on the object
      Vue.set(state.project.resources[resourceIndex].model[modelIndex], 'showing', !state.project.resources[resourceIndex].model[modelIndex].showing)
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
