import { lazy, type ComponentType } from 'react';

interface Router {
  path: string;
  element: ComponentType;
}

export const routes: Router[] = [
  {
    path: '/search',
    element: lazy(() => import('../pages/SearchPage')),
  },
  {
    path: '/search/*',
    element: lazy(() => import('../pages/SearchPage')),
  },
  {
    path: '/',
    element: lazy(() => import('../pages/HomePage')),
  },
  {
    path: '/movie/:id',
    element: lazy(() => import('../pages/DetailPage')),
  },
  {
    path: '/favorites',
    element: lazy(() => import('../pages/FavoritePage')),
  },
  {
    path: '*',
    element: lazy(() => import('../pages/SearchPage')),
  },
];
