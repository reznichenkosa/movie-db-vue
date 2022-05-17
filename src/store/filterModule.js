export const filterModule = {
    state: () => ({
      sortParam: '',
      searchParam: '',
      genreParam: '',
      allSortParams: [
        {all: "Все"},
        {RATING: "По рейтингу"},
        {YEAR: "По году"},
        {NUM_VOTE: "По числу голосов"},
      ],
      allGenres: [],
      currentCategory: 'TOP_100_POPULAR_FILMS',
    }),
    getters: {
  
    },
    mutations: {
      setCurrentCategory(state, category) {
        state.currentCategory = category;
      },
      setAllGenres(state, genres) {
          state.allGenres = genres;
      }
    },
    actions: {
        async fetchBestMovies({
            state,
            commit
          }) {
            try {
              const response = await fetch(
                'https://kinopoiskapiunofficial.tech/api/v2.2/films/filters', {
                  method: 'GET',
                  headers: {
                    'X-API-KEY': 'd728b076-e483-4101-bdc1-36045f160f44',
                    'Content-Type': 'application/json',
                  },
                });
              const data = await response.json();
              commit('setAllGenres', data.genres);
            } catch (error) {
              console.log(error)
            } finally {
            }
          },
    },
    namespaced: true,
  }
  