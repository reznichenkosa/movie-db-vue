<template>
  <section class="top-movies">
    <div class="container">
      <swiper :slides-per-view="3" :space-between="50">
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
    </div>
  </section>
  <section v-if="history.length !== 0" class="visited-movies">
    <div class="container">
      <h1>Вы смотрели</h1>
      <div class="slider">
        <swiper :slides-per-view="5" :space-between="30">
          <swiper-slide
            v-for="historyMovie in [...history.reverse()]"
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

export default {
  components: {
    Swiper,
    SwiperSlide,
    SliderCard,
    FiltersBar,
    MovieCard,
    MoreButton,
  },
  name: "home-page",

  mounted() {
    this.fetchPremierMovies();
    this.fetchAllMovies();
  },

  methods: {
    ...mapActions({
      fetchPremierMovies: "movie/fetchPremierMovies",
      fetchAllMovies: "movie/fetchAllMovies",
    }),
    ...mapMutations({
      setCurrentCategory: "filter/setCurrentCategory",
      incCurrentAllMoviesPage: "movie/incCurrentAllMoviesPage",
      resetAllMoviesData: "movie/resetAllMoviesData",
      toggleFavoriteMovies: "movie/toggleFavoriteMovies",
    }),
    loadMoreMovie() {
      this.incCurrentAllMoviesPage();
      this.fetchAllMovies();
    },
    isFavoriteMovie(movie) {
      return this.favoriteId.includes(movie.filmId);
    },
  },

  computed: {
    ...mapState({
      premierMovies: (state) => state.movie.premierMovies,
      allMovies: (state) => state.movie.allMovies,
      currentCategory: (state) => state.filter.currentCategory,
      favoriteId: (state) => state.movie.favoriteId,
      favoriteMovies: (state) => state.movie.favoriteMovies,
      history: (state) => state.movie.history,
    }),
    ...mapGetters({
      isLastPage: "movie/isLastPage",
    }),
    moviesToShow() {
      return this.currentCategory === "FAVORITE"
        ? [...this.favoriteMovies].reverse()
        : this.allMovies;
    },
    isShowMoreButton() {
      return (
        !this.isLastPage &&
        this.moviesToShow.length !== 0 &&
        this.currentCategory !== "FAVORITE"
      );
    },
  },

  watch: {
    currentCategory() {
      if (this.currentCategory !== "FAVORITE") {
        this.resetAllMoviesData();
        this.fetchAllMovies();
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
</style>
