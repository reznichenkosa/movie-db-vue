<template>
  <section class="top-movies">
    <div class="container">
      <swiper :slides-per-view="3" :space-between="50">
        <swiper-slide v-for="i in 5" :key="i">
          <slider-card />
        </swiper-slide>
      </swiper>
    </div>
  </section>
  <section class="all-movies">
    <div class="container wrapper">
      <filters-bar />
      <div class="movie-list">
        <movie-card />
        <movie-card />
        <movie-card />
        <movie-card />
        <movie-card />
        <movie-card />
        <movie-card />
        <movie-card />
        <movie-card />
        <movie-card />
      </div>
      <more-button> Показать еще</more-button>
    </div>
  </section>
  <section class="visited-movies">
    <div class="container">
      <h1>Вы смотрели</h1>
      <div class="slider">
        <swiper :slides-per-view="6" :space-between="50">
        <swiper-slide v-for="i in 10" :key="i">
          <movie-card />
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
import MoreButton from '@/components/UI/MoreButton.vue';

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
};
</script>

<style scoped lang="scss">
.all-movies {
  padding: 60px 0;

  .movie-list {
    padding: 30px 0;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 330px;
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
