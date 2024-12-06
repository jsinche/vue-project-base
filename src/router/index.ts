import { createRouter, createWebHistory } from 'vue-router'
import { userRoute } from '@/modules/users/router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/dashboard",
      name: "dashboard",
      redirect: "/dashboard/users",
      component: () => import("@/layouts/GeneralLayout.vue"),
      children: [
        {
          ...userRoute,
        }
      ]
    },
  ],
})

export default router
