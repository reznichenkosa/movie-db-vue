import { createStore } from 'vuex';
import { filterModule } from './filterModule';
import { movieModule } from './movieModule';

export default createStore({
  modules: {
    movie: movieModule,
    filter: filterModule
  },
});
