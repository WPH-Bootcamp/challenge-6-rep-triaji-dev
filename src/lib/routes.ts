import { lazy, type ComponentType } from 'react';

interface Router {
  path: string;
  element: ComponentType;
}

export const routes: Router[] = [
  {
    path: '/search',
    element: lazy(() => import('../components/pages/SearchPage')),
  },
  {
    path: '/search/*',
    element: lazy(() => import('../components/pages/SearchPage')),
  },
  {
    path: '/',
    element: lazy(() => import('../components/pages/HomePage')),
  },
  {
    path: '/movie/:id',
    element: lazy(() => import('../components/pages/DetailPage')),
  },
  {
    path: '/favorites',
    element: lazy(() => import('../components/pages/FavoritePage')),
  },
  {
    path: '*',
    element: lazy(() => import('../components/pages/SearchPage')),
  },
];
