<template>
  <section class="top-movies">
    <div class="container">
      <swiper
        :breakpoints="breakpointsForPremier"
        :slidesPerView="3"
        :spaceBetween="50"
      >
        <swiper-slide
          v-for="premierMovie in premierMovies"
          :key="premierMovie.filmId"
        >
          <slider-card
            :isFavorite="isFavoriteMovie(premierMovie)"
            @toggleFavoriteMovie="toggleFavoriteMovies(premierMovie)"
            :movie="premierMovie"
          />
        </swiper-slide>
      </swiper>
    </div>
  </section>
  <section class="all-movies">
    <div class="container wrapper">
      <filters-bar
        :genreParams="genreParams"
        :sortParams="sortParams"
        :searchQuery="searchQuery"
        :currentSortParam="currentSortParam"
        :currentGenreParam="currentGenreParam"
        @onSearch="onSearch"
        @changeGenre="(genreParam) => setGenreParam(genreParam)"
        @changeSort="(sortParam) => setSortParam(sortParam)"
        @changeSearchInput="(newSearchQuery) => setSearchQuery(newSearchQuery)"
        @changeCurrentCategory="(category) => setCurrentCategory(category)"
        :currentCategory="currentCategory"
      />
      <div class="movie-list">
          <movie-card
            :isFavorite="isFavoriteMovie(movie)"
            @toggleFavoriteMovie="toggleFavoriteMovies(movie)"
            v-for="movie in moviesToShow"
            :key="movie.filmId"
            :movie="movie"
          />
      </div>
      <more-button v-if="isShowMoreButton" @click="loadMoreMovie()">
        Показать еще
      </more-button>
      <div
        v-if="moviesToShow.length === 0 && !isAllMoviesLoading"
        class="message"
      >
        {{
          isSearch
            ? "По Вашему запросу ничего не найдено!"
            : "Вы не добавили ни одного фильма в избранное!"
        }}
      </div>
      <custom-loader v-if="isAllMoviesLoading" />
    </div>
  </section>
  <section v-if="history.length !== 0" class="visited-movies">
    <div class="container">
      <h1>Вы смотрели</h1>
      <div class="slider">
        <swiper
          :breakpoints="breakpointsForOther"
          :slides-per-view="5"
          :space-between="30"
        >
          <swiper-slide
            v-for="historyMovie in history"
            :key="historyMovie.filmId"
          >
            <movie-card
              :isFavorite="isFavoriteMovie(historyMovie)"
              @toggleFavoriteMovie="toggleFavoriteMovies(historyMovie)"
              :movie="historyMovie"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import SliderCard from "@/components/SliderCard.vue";
import FiltersBar from "@/components/FiltersBar.vue";
import MovieCard from "@/components/MovieCard.vue";
import MoreButton from "@/components/UI/MoreButton.vue";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import CustomLoader from "@/components/UI/CustomLoader.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    SliderCard,
    FiltersBar,
    MovieCard,
    MoreButton,
    CustomLoader,
  },
  name: "home-page",
  data() {
    return {
      breakpointsForPremier: {
        // when window width is >= 320px
        300: {
          slidesPerView: 1,
          centeredSlides: "true",
        },
        920: {
          slidesPerView: 3,
          spaceBetween: 30,
          centeredSlides: false,
        },
        // when window width is >= 480px
        1320: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      },
      breakpointsForOther: {
        // when window width is >= 320px
        300: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
        },
        800: {
          slidesPerView: 3,
        },
        920: {
          slidesPerView: 4,
        },
        // when window width is >= 480px
        1320: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      },
    };
  },
  mounted() {
    this.fetchPremierMovies();
    this.fetchAllMovies();
    this.fetchAllGenres();
  },

  methods: {
    ...mapActions({
      fetchPremierMovies: "movie/fetchPremierMovies",
      fetchAllMovies: "movie/fetchAllMovies",
      // filter
      fetchAllGenres: "filter/fetchAllGenres",
      fetchMovieBySearchParams: "movie/fetchMovieBySearchParams",
    }),
    ...mapMutations({
      setCurrentCategory: "filter/setCurrentCategory",
      incCurrentAllMoviesPage: "movie/incCurrentAllMoviesPage",
      resetAllMoviesData: "movie/resetAllMoviesData",
      toggleFavoriteMovies: "movie/toggleFavoriteMovies",
      setSearchQuery: "filter/setSearchQuery",
      setGenreParam: "filter/setGenreParam",
      setSortParam: "filter/setSortParam",
      setIsSearch: "filter/setIsSearch",
    }),
    loadMoreMovie() {
      if (this.isSearch) {
        this.incCurrentAllMoviesPage();
        this.fetchMovieBySearchParams();
      } else {
        this.incCurrentAllMoviesPage();
        this.fetchAllMovies();
      }
    },
    isFavoriteMovie(movie) {
      return this.favoriteId.includes(movie.filmId || movie.kinopoiskId);
    },
    onSearch() {
      this.setCurrentCategory("");
      this.resetAllMoviesData();
      this.fetchMovieBySearchParams();
    },
  },

  computed: {
    ...mapState({
      premierMovies: (state) => state.movie.premierMovies,
      allMovies: (state) => state.movie.allMovies,
      favoriteId: (state) => state.movie.favoriteId,
      favoriteMovies: (state) => state.movie.favoriteMovies,
      history: (state) => state.movie.history,
      isAllMoviesLoading: (state) => state.movie.isAllMoviesLoading,
      // filter
      currentCategory: (state) => state.filter.currentCategory,
      genreParams: (state) => state.filter.genreParams,
      sortParams: (state) => state.filter.sortParams,
      searchQuery: (state) => state.filter.searchQuery,
      currentSortParam: (state) => state.filter.currentSortParam,
      currentGenreParam: (state) => state.filter.currentGenreParam,
      isSearch: (state) => state.filter.isSearch,
    }),
    ...mapGetters({
      isLastPage: "movie/isLastPage",
    }),
    moviesToShow() {
      return this.currentCategory === "FAVORITE"
        ? this.favoriteMovies
        : this.allMovies;
    },
    isShowMoreButton() {
      return (
        !this.isLastPage &&
        this.moviesToShow.length !== 0 &&
        this.currentCategory !== "FAVORITE" &&
        !this.isAllMoviesLoading
      );
    },
  },

  watch: {
    currentCategory() {
      if (this.currentCategory !== "FAVORITE" && this.currentCategory !== "") {
        this.resetAllMoviesData();
        this.fetchAllMovies();
      }
      if (this.currentCategory !== "") {
        this.setIsSearch(false);
        this.setSearchQuery("");
        this.setGenreParam("");
        this.setSortParam("");
      }
    },
    currentSortParam() {
      if (this.searchQuery.length > 3) {
        this.resetAllMoviesData();
        this.fetchMovieBySearchParams();
      }
    },
    currentGenreParam() {
      if (this.searchQuery.length > 3) {
        this.resetAllMoviesData();
        this.fetchMovieBySearchParams();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.all-movies {
  padding: 60px 0;

  .movie-list {
    padding: 30px 0;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 410px;
    gap: 30px 30px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.visited-movies {
  padding: 0 0 60px 0;
  .slider {
    margin-top: 40px;
  }
}



@media (max-width: 680px) {
  .all-movies {
    .movie-list {
      padding: 30px 0;
      display: grid;
      grid-template-columns: 1fr;
      grid-auto-rows: 410px;
      gap: 30px 30px;
    }
  }
}
</style>
