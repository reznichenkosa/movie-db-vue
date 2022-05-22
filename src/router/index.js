import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage';
import MoviePage from '@/pages/MoviePage';
import ErrorPage from '@/pages/ErrorPage';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/movies/:id',
    name: 'movie',
    component: MoviePage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'error',
    component: ErrorPage,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
