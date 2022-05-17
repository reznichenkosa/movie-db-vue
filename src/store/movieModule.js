const api_key = process.env.VUE_APP_API_KEY2;

export const movieModule = {
  state: () => ({
    premierMovies: [],
    currentPremierMoviesPage: 1,
    isPremierMoviesLoading: false,
    allMovies: [],
    currentAllMoviesPage: 1,
    allMoviePagesCount: 0,
    isAllMoviesLoading: false,
    history: [],
    favoriteMovies: [],
    favoriteId: [],
  }),
  getters: {
    isLastPage(state) {
      return state.currentAllMoviesPage >= state.allMoviePagesCount;
    }
  },
  mutations: {
    //Premier movies

    setIsPremierMovieLoading(state, bool) {
      state.isPremierMoviesLoading = bool;
    },
    setPremierMovies(state, movies) {
      state.premierMovies = movies;
    },

    //All movies

    setIsAllMovieLoading(state, bool) {
      state.isAllMoviesLoading = bool;
    },
    setAllMovies(state, movies) {
      state.allMovies = movies;
    },
    addAllMovies(state, movies) {
      state.allMovies.push(...movies);
    },
    incCurrentAllMoviesPage(state) {
      state.currentAllMoviesPage += 1;
    },
    setAllMoviePagesCount(state, pageCount) {
      state.allMoviePagesCount = pageCount;
    },
    resetAllMoviesData(state) {
      state.allMovies = [];
      state.currentAllMoviesPage = 1;
      state.allMoviePagesCount = 0;
    },

    //Favorite movies

    toggleFavoriteMovies(state, movie) {
      if (state.favoriteId.includes(movie.filmId)) {
        state.favoriteMovies = state.favoriteMovies.filter(item => item.filmId !== movie.filmId);
        state.favoriteId = state.favoriteId.filter(item => item !== movie.filmId);
      } else {
        state.favoriteMovies.push(movie);
        state.favoriteId.push(movie.filmId);
      }
    },

    //History

    setHistory(state, movie) {
      console.log(!state.history.some(item => item.kinopoiskId === movie.kinopoiskId))
      if (!state.history.some(item => item.kinopoiskId === movie.kinopoiskId)) {
        state.history.push(movie);
        state.history = state.history.slice(-10);
      }
    },
  },
  actions: {

    async fetchPremierMovies({
      commit
    }) {
      try {
        commit('setIsPremierMovieLoading', true);
        const response = await fetch(
          'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_AWAIT_FILMS&page=1', {
            method: 'GET',
            headers: {
              'X-API-KEY': api_key,
              'Content-Type': 'application/json',
            },
          })
        const data = await response.json();
        commit('setPremierMovies', data.films);
      } catch (error) {
        console.log(error)
      } finally {
        commit('setIsPremierMovieLoading', false);
      }
    },
    async fetchAllMovies({
      state,
      commit,
      rootState
    }) {
      try {
        commit('setIsAllMovieLoading', true);
        const response = await fetch(
          `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=${rootState.filter.currentCategory}&page=${state.currentAllMoviesPage}`, {
            method: 'GET',
            headers: {
              'X-API-KEY': api_key,
              'Content-Type': 'application/json',
            },
          });
        const data = await response.json();
        commit('setAllMoviePagesCount', data.pagesCount);
        if (state.currentAllMoviesPage === 1) {
          commit('setAllMovies', data.films);
        } else {
          commit('addAllMovies', data.films);
        }
      } catch (error) {
        console.log(error)
      } finally {
        commit('setIsAllMovieLoading', false);
      }
    }
  },
  namespaced: true,
}