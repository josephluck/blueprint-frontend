const UiModule = {
  state: {
    currentModal: '',
    modalShowing: false
  },
  mutations: {
    'ui/TOGGLE_MODAL' (state, {name, showing}) {
      showing === true ? state.currentModal = name : state.currentModal = ''
      state.modalShowing = showing
    }
  },
  actions: {}
}

export default UiModule
