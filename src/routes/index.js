// const none = { render: h => h('router-view') }

export default [
  {
    path: '/login',
    component: require('../containers/Login.vue')
  },
  {
    path: '/signup',
    component: require('../containers/Signup.vue')
  },
  {
    path: '',
    component: require('../containers/AuthenticatedView.vue'),
    children: [
      {
        name: 'project',
        path: ':projectId',
        component: require('../containers/Project.vue'),
        children: [
          {
            name: 'projectEdit',
            path: 'edit',
            component: require('../containers/ProjectEdit.vue')
          },
          {
            name: 'projectDocs',
            path: 'docs',
            component: require('../containers/ProjectDocs.vue')
          },
          {
            name: 'projectSettings',
            path: 'settings',
            component: require('../containers/ProjectSettings.vue')
          }
        ]
      }
    ]
  }
]
