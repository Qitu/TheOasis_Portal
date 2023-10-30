export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'Login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/conversation/:id',
    layout: false,
    component: './Conversation/',
  },
  {
    path: '/metahuman/:id',
    component: './MetahumanDetail/',
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: './Admin',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
