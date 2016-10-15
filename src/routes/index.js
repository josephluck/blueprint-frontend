const noop = { render: h => h('router-view') }

export default [
  {
    path: '/todos',
    component: noop,
    children: [
      {
        path: '',
        component: require('./Todos.vue')
      },
      {
        name: 'todo',
        path: ':todoId',
        component: require('./Todo.vue')
      }
    ]
  }
]
