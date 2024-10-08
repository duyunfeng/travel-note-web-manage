import { createRouter, createWebHistory } from 'vue-router';

const route = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/Home.vue'),
    children: [
      {
        path: '/personal',
        name: 'personal',
        component: () => import('@/views/personal/Personal.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/User.vue')
      },
      {
        path: '/foodInformation',
        name: 'foodInformation',
        component: () => import('@/views/resources/FoodInformation.vue')
      },
      {
        path: '/siteInformation',
        name: 'siteInformation',
        component: () => import('@/views/resources/SiteInformation.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/addResource/:id',
    name: 'addResource',
    component: () => import('@/views/resources/AddResources.vue')
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: route
});

router.beforeEach((to, from) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') ?? 'false';
  if (
    // 检查用户是否已登录
    isAuthenticated === 'false' &&
    // ❗️ 避免无限重定向
    to.name !== 'login'
  ) {
    return { name: 'login' };
  } else if (
    // 检查用户是否已登录
    isAuthenticated === 'true' &&
    // ❗️ 避免无限重定向
    to.name === 'login'
  ) {
    return { name: 'home' };
  }
});

export default router;
