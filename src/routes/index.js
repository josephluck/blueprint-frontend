const none = { render: h => h('router-view') }

export default [
  {
    path: '/login',
    component: require('./Login.vue')
  },
  {
    path: '',
    component: require('./AuthenticatedView.vue'),
    children: [
      {
        path: '/todos',
        component: none,
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
      },
      {
        path: '/resources',
        component: require('./Resources.vue')
      }
    ]
  }
]
