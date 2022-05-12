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
    <div class="container">
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
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import SliderCard from "@/components/SliderCard.vue";
import FiltersBar from "@/components/FiltersBar.vue";
import MovieCard from "@/components/MovieCard.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    SliderCard,
    FiltersBar,
    MovieCard,
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
}
</style>
