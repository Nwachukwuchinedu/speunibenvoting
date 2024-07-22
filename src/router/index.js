import { createRouter, createWebHistory } from 'vue-router'
import landingPage from '../views/landingPage.vue'
import registerPage from '../views/registerPage.vue'
import loginPage from '../views/loginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingpage',
      component: landingPage
    },
    {
      path: '/register',
      name: 'Register',
      component: registerPage
    },
    {
      path: '/login',
      name: 'Login',
      component: loginPage
    }
  ]
})

export default router
