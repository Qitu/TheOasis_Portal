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
    path: '/Home',
    name: 'Home',
    // component: './Welcome',
    component: './Conversation/',
  },
  {
    path: '/metahuman/:id',
    component: './MetahumanDetail/',
  },
  {
    path: '/',
    redirect: '/admin',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
