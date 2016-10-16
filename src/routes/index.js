const none = { render: h => h('router-view') }

export default [
  {
    path: '/login',
    component: require('./Login.vue')
  },
  {
    path: '/signup',
    component: require('./Signup.vue')
  },
  {
    path: '',
    component: require('./AuthenticatedView.vue'),
    children: [
      {
        path: '/projects',
        component: none,
        children: [
          {
            name: 'project',
            path: ':projectId',
            component: require('./Project.vue')
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
