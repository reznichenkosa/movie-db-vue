import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage';
import MoviePage from '@/pages/MoviePage';

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
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
