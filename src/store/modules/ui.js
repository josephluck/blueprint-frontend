const UiModule = {
  state: {
    openModalName: false,
    currentlyViewing: ''
  },
  mutations: {
    'ui/SET_MODAL_NAME' (state, name) {
      state.openModalName = name
    },
    'ui/SET_CURRENTLY_VIEWING' (state, elm) {
      state.currentlyViewing = elm
    }
  },
  actions: {}
}

export default UiModule
