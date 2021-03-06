const api_key = process.env.VUE_APP_API_KEY;
import router from "@/router";

export const movieModule = {
  state: () => ({
    premierMovies: [],
    currentPremierMoviesPage: 1,
    isPremierMoviesLoading: false,
    allMovies: [],
    currentAllMoviesPage: 1,
    allMoviePagesCount: 0,
    isAllMoviesLoading: false,
    history: JSON.parse(localStorage.getItem('history')) || [],
    favoriteMovies: JSON.parse(localStorage.getItem('favoriteMovies')) || [],
    favoriteId: JSON.parse(localStorage.getItem('favoriteId')) || [],
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
      const newMovieId = movie.filmId || movie.kinopoiskId;
      if (state.favoriteId.includes(newMovieId)) {
        state.favoriteMovies = state.favoriteMovies.filter(item => (item.filmId || item.kinopoiskId) !== newMovieId);
        state.favoriteId = state.favoriteId.filter(item => item !== newMovieId);
      } else {
        state.favoriteMovies.unshift(movie);
        state.favoriteId.unshift(newMovieId);
      }
    },

    //History

    setHistory(state, movie) {
      if (!state.history.some(item => item.kinopoiskId === movie.kinopoiskId)) {
        state.history.unshift(movie);
        state.history = state.history.slice(0, 10);
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
        commit('setPremierMovies', data?.films?.slice(0, 10));
      } catch (error) {
        router.push({name: 'error'});
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
        router.push({name: 'error'});
      } finally {
        commit('setIsAllMovieLoading', false);
      }
    },
    async fetchMovieBySearchParams({
      state,
      commit,
      rootState
    }) {
      const genreParam = rootState.filter.currentGenreParam && rootState.filter.currentGenreParam !== '0' ? '&genres=' + rootState.filter.currentGenreParam : '';
      const sortParma = rootState.filter.currentSortParam && rootState.filter.currentSortParam !== '' ? '&order=' + rootState.filter.currentSortParam : '';
      const searchQuery = rootState.filter.searchQuery ? encodeURI('&keyword=' + rootState.filter.searchQuery) : '';
      const url = `https://kinopoiskapiunofficial.tech/api/v2.2/films?type=ALL&ratingFrom=0&ratingTo=10&yearFrom=1000&yearTo=3000&page=${state.currentAllMoviesPage}${genreParam}${sortParma}${searchQuery}`;
      try {
        commit('setIsAllMovieLoading', true);
        const response = await fetch( url , {
            method: "GET",
            headers: {
              "X-API-KEY": api_key,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        rootState.filter.isSearch = true;
        commit('setAllMoviePagesCount', data.totalPages);
        if (state.currentAllMoviesPage === 1) {
          commit('setAllMovies', data.items);
        } else {
          commit('addAllMovies', data.items);
        }
      } catch (error) {
        router.push({name: 'error'});
      } finally {
        commit('setIsAllMovieLoading', false);
      }
    },
  },
  
  namespaced: true,
}
