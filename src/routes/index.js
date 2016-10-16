// const none = { render: h => h('router-view') }

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
        path: '/resources',
        component: require('./Resources.vue')
      }
    ]
  }
]
