import { createStore } from 'vuex';
import { filterModule } from './filterModule';
import { movieModule } from './movieModule';

export const store = createStore({
  modules: {
    movie: movieModule,
    filter: filterModule
  },
});

store.subscribe((mutation, state) => {
  localStorage.setItem('favoriteId', JSON.stringify(state.movie.favoriteId));
  localStorage.setItem('favoriteMovies', JSON.stringify(state.movie.favoriteMovies));
  localStorage.setItem('history', JSON.stringify(state.movie.history));
});