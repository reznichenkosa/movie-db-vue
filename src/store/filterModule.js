export const filterModule = {
    state: () => ({
      isSearch: false,
      currentSortParam: '',
      currentGenreParam: '',
      searchQuery: '',
      genreParams: [],
      sortParams: [
        {
          value: "",
          name: "Все",
        },
        {
          value: "RATING",
          name: "По рейтингу",
        },
        {
          value: "YEAR",
          name: "По году",
        },
        {
          value: "NUM_VOTE",
          name: "По числу голосов",
        },
      ],
      currentCategory: 'TOP_100_POPULAR_FILMS',
    }),
    getters: {
  
    },
    mutations: {
      setCurrentCategory(state, category) {
        state.currentCategory = category;
      },
      setAllGenres(state, genres) {
        //remove empty genres
        const filteredGenres = genres.filter(item => item.genre !== '');
        filteredGenres.unshift({id: "0", genre: 'Все'})
        //first letter capital
        state.genreParams = filteredGenres.map(item => {
          item.id = String(item.id);
          item.genre = item.genre[0].toUpperCase() + item.genre.slice(1);
          return item;
        });
      },
      setSearchQuery(state, newQuery) {
        state.searchQuery = newQuery;
      },
      setGenreParam(state, newParam) {
        state.currentGenreParam = newParam;
      },
      setSortParam(state, newParam) {
        state.currentSortParam = newParam;
      },
      setIsSearch(state, bool) {
        state.isSearch = bool;
      }
    },
    actions: {
        async fetchAllGenres({
            state,
            commit
          }) {
            try {
              const response = await fetch(
                'https://kinopoiskapiunofficial.tech/api/v2.2/films/filters', {
                  method: 'GET',
                  headers: {
                    'X-API-KEY': process.env.VUE_APP_API_KEY,
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
  