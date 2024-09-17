import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated') || 'false')
  console.log(isAuthenticated)
  if (
    // 检查用户是否已登录
    isAuthenticated === 'false' &&
    // ❗️ 避免无限重定向
    to.name !== 'login'
  ) {
    return { name: 'login' }
  } else if (
    // 检查用户是否已登录
    isAuthenticated === 'true' &&
    // ❗️ 避免无限重定向
    to.name !== 'home'
  ) {
    return { name: 'home' }
  }
})

export default router
