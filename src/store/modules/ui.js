const UiModule = {
  state: {
    openModalName: false,
    currentlyViewing: window.location.hash.substring(1)
  },
  mutations: {
    'ui/SET_MODAL_NAME' (state, name) {
      state.openModalName = name
    },
    'ui/SET_CURRENTLY_VIEWING' (state, elm) {
      // The below is nice since it updates the URL but it causes the page to jump to the elm breaking smooth scrolling
      // window.location.hash = elm
      state.currentlyViewing = elm
    }
  },
  actions: {}
}

export default UiModule
