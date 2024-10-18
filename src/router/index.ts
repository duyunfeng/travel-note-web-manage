import { createRouter, createWebHistory } from 'vue-router';
import { emitter } from '@/middleware/Emitter';
import { useLoginStore } from '@/stores/login';
import { useUserStore } from '@/stores/user';
import { setDarkMode } from '@/utils';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/Home.vue'),
    children: [
      {
        path: '/homeView',
        name: 'homeView',
        component: () => import('@/views/home/HomeView.vue')
      },
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
      },
      {
        path: '/articles',
        name: 'articles',
        component: () => import('@/views/article/Articles.vue')
      },
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
    component: () => import('@/views/resources/AddResources.vue'),
  },
  {
    path: '/addArticles/:id',
    name: 'addArticles',
    component: () => import('@/views/article/AddArticles.vue')
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from) => {
  const { isAuthenticated } = useLoginStore();
  if(to.name !== 'login') {
    const { isDark } = useUserStore();
    setDarkMode(isDark);
  }
  if (
    // 检查用户是否已登录
    isAuthenticated === false &&
    // ❗️ 避免无限重定向
    to.name !== 'login'
  ) {
    return { name: 'login' };
  } else if (
    // 检查用户是否已登录
    isAuthenticated === true &&
    // ❗️ 避免无限重定向
    to.name === 'login'
  ) {
    return { name: 'homeView' };
  } else if (
    isAuthenticated === true &&
    // ❗️ 避免无限重定向
    to.name === 'home') {
      return { name: 'homeView' };
  }
});

emitter.on('API:UN_AUTH', () => {
  emitter.emit('ROUTER:LOGOUT')
})

emitter.on('ROUTER:LOGIN', () => {
  router.push({ name: 'homeView' })
})

emitter.on('ROUTER:LOGOUT', () => {
  const loginStore = useLoginStore();
  const userStore = useUserStore();
  loginStore.changeIsAuthent(false);
  loginStore.logout();
  userStore.logout();
  setDarkMode(false);
  router.push({ name: 'login' });
})

export default router;
