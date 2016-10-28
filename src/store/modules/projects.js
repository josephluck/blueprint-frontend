import Vue from 'vue'
import Urls from '../../api/urls'
import Sockets from '../../api/sockets'

const ProjectsModule = {
  state: {
    projects: [],
    count: 0,
    page: 1,
    loading: false
  },
  mutations: {
    'projects/GET_PROJECTS' (state, page) {
      state.loading = true
      state.page = page
    },
    'projects/GET_PROJECTS_ERROR' (state, error) {
      state.loading = false
    },
    'projects/RECEIVE_PROJECTS' (state, payload) {
      state.projects = payload.data
      state.count = payload.total
      state.loading = false
    },
    'projects/RECEIVE_PROJECT' (state, project) {
      state.projects.unshift(project)
      state.loading = false
    },
    'projects/TOGGLE_MENU_SHOWING' (state, projectId) {
      let project = state.projects.find((project) => project._id === projectId)
      project.menuOpened = !project.menuOpened
    }
  },
  actions: {
    'projects/PAGINATE' ({commit}, page) {
      commit('projects/GET_PROJECTS', page)
      Vue.http.get(Urls.projects(page))
        .then(response => commit('projects/RECEIVE_PROJECTS', response.body))
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
