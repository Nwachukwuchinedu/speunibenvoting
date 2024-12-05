import { createRouter, createWebHistory } from 'vue-router'
import landingPage from '../views/landingPage.vue'
import registerPage from '../views/registerPage.vue'
import loginPage from '../views/loginPage.vue'
import ResetPassword from '@/views/resetPassword.vue'
import ForgotPassword from '@/views/forgotPassword.vue'
import VerifyAccount from '@/views/verifyAccount.vue'
import DashboardPage from '@/views/dashboardPage.vue'

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
    },
    {
      path: '/forgot-password',
      name: 'Forgot-Password',
      component: ForgotPassword
    },
    {
      path: '/reset-password',
      name: 'Reset-Password',
      component: ResetPassword
    },
    {
      path: '/verify-email',
      name: 'Verify-Account',
      component: VerifyAccount
    },{
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardPage
    }
  ]
})

export default router
