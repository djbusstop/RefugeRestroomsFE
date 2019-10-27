export default [
  {
    path: '/restrooms',
    name: 'restrooms',
    component: () => import('./views/List.vue'),
  },
  // {
  //   path: '/restroom/:id',
  //   name: 'restroom',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ './views/Detail.vue'),
  // },
];
