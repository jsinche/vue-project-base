export interface RouterLink {
  icon: string;
  name: string;
  path: string;
  title: string;
}

export const routerLinks: RouterLink[] = [
  {
    icon: 'pi pi-users',
    name: 'users',
    path: '/dashboard/users',
    title: 'Users',
  },
  {
    icon: 'pi pi-trash  ',
    name: 'pruebitas',
    path: '/dashboard/pruebitas',
    title: 'Pruebitas',
  }
];
