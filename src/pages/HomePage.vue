<template>
  <section class="top-movies">
    <div class="container">
      <swiper :slides-per-view="3" :space-between="50">
        <swiper-slide v-for="premierMovie in premierMovies" :key="premierMovie.filmId">
          <slider-card :movie="premierMovie"/>
        </swiper-slide>
      </swiper>
    </div>
  </section>
  <section class="all-movies">
    <div class="container wrapper">
      <filters-bar @changeCurrentCategory="(category) => setCurrentCategory(category)" :currentCategory="currentCategory"/>
      <div class="movie-list">
        <movie-card :isFavoriteMovie="isFavoriteMovie(movie)" @toggleFavoriteMovie="toggleFavoriteMovies(movie)" v-for="movie in moviesToShow" :key="movie.filmId" :movie="movie"/>
      </div>
      <more-button v-if="!isLastPage || moviesToShow.length !== 0" @click="loadMoreMovie()"> Показать еще</more-button>
    </div>
  </section>
  <section class="visited-movies">
    <div class="container">
      <h1>Вы смотрели</h1>
      <div class="slider">
        <!-- <swiper :slides-per-view="6" :space-between="50">
          <swiper-slide >
            <movie-card />
          </swiper-slide>
        </swiper> -->
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
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

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
  methods: {
    ...mapActions({
      fetchPremierMovies: 'movie/fetchPremierMovies',
      fetchAllMovies: 'movie/fetchAllMovies',
    }),
    ...mapMutations({
      setCurrentCategory: 'filter/setCurrentCategory',
      incCurrentAllMoviesPage: 'movie/incCurrentAllMoviesPage',
      resetAllMoviesData: 'movie/resetAllMoviesData',
      toggleFavoriteMovies: 'movie/toggleFavoriteMovies',
    }),
    loadMoreMovie() {
      this.incCurrentAllMoviesPage();
      this.fetchAllMovies();
    },
    isFavoriteMovie(movie) {
      return this.favorite[movie.id] ? true : false;
    }
  },
  computed: {
    ...mapState({
      premierMovies: state => state.movie.premierMovies,
      allMovies: state => state.movie.allMovies,
      currentCategory: state => state.filter.currentCategory,
      favorite: state => state.movie.favorite,
    }),
    ...mapGetters({
      isLastPage: 'movie/isLastPage',
    }),
    moviesToShow() {
      if (this.currentCategory === 'FAVORITE') {
        return Object.values(this.favorite).reverse();
      }
      return this.allMovies;
    }
  },
  mounted() {
    this.fetchPremierMovies();
    this.fetchAllMovies();
  },
  watch: {
    currentCategory() {
      this.resetAllMoviesData();
      if (this.currentCategory !== 'FAVORITE') {
        this.fetchAllMovies();
      }
    },
  }
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
