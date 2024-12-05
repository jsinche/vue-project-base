import type { RouteRecordRaw } from "vue-router";

const ROUTE_NAME = 'users';
export const userRoute: RouteRecordRaw = {
  path: `${ROUTE_NAME}`,
  redirect: { name: 'users-list' },
  component: () => import('@/modules/users/layouts/UserLayout.vue'),
  children: [
    {
      path: 'list',
      name: 'users-list',
      component: () => import('@/modules/users/pages/UserList.vue'),
    }
  ]
}

