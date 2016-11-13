const UiModule = {
  state: {
    currentModal: '',
    modalShowing: false,
    currentlyViewing: ''
  },
  mutations: {
    'ui/TOGGLE_MODAL' (state, {name, showing}) {
      showing === true ? state.currentModal = name : state.currentModal = ''
      state.modalShowing = showing
    },
    'ui/SET_CURRENTLY_VIEWING' (state, elm) {
      state.currentlyViewing = elm
    }
  },
  actions: {}
}

export default UiModule
