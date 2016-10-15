const TodosModule = {
  state: {
    todos: [
      {
        text: 'Get great at Vue!',
        id: 1,
        completed: false,
        comments: []
      }
    ]
  },
  mutations: {
    'todos/ADD_NEW_TODO' (state, text) {
      state.todos.push({
        text,
        id: new Date().getTime(),
        completed: false,
        comments: []
      })
    },
    'todos/TOGGLE_TODO' (state, todo) {
      todo.completed = !todo.completed
    }
  },
  actions: {
    'todos/ADD_NEW_TODO' ({commit}, text) {
      commit('todos/ADD_NEW_TODO', text)
    },
    'todos/TOGGLE_TODO' ({commit}, todo) {
      commit('todos/TOGGLE_TODO', todo)
    }
  }
}

export default TodosModule
