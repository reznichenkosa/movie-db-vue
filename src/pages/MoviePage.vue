<template>
  <section class="movie">
    <div
      class="background"
      :style="{
        background: `url(${
          movie.coverUrl || require('@/assets/img/cover-default.png')
        }) center top/cover no-repeat`,
      }"
    ></div>
    <div class="container">
      <div v-if="isLoading" class="loader">
        <custom-loader />
      </div>
      <div v-else class="wrapper">
        <div class="content">
          <h2 class="title">{{ movie.nameRu }}</h2>
          <ul class="list">
            <li v-if="movie.ratingImdb">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#2f80ed"
                class="bi bi-star"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                /></svg
              >&nbsp;{{ movie.ratingImdb }}
            </li>
            <li v-for="genre in movie?.genres?.slice(0, 3)" :key="genre">
              {{ genre.genre }}
            </li>
            <li v-if="movie.year">{{ movie.year }}</li>
            <li v-if="movie.filmLength">
              {{ formatFilmLength(movie.filmLength) }}
            </li>
            <li v-if="movie.ratingAgeLimits">
              {{
                movie.ratingAgeLimits &&
                movie.ratingAgeLimits.replace("age", "")
              }}+
            </li>
          </ul>
          <p class="description">{{ movie.description }}</p>
        </div>
        <div v-if="movie.posterUrl" class="poster">
          <img :src="movie.posterUrl" :alt="movie.nameRu" />
        </div>
      </div>
    </div>
  </section>
  <section v-if="similarMovie.length !== 0" class="similar-movies">
    <div class="container">
      <h1>Похожие фильмы</h1>
      <div class="slider">
        <swiper :breakpoints="breakpointsForOther" :slides-per-view="5" :space-between="30">
          <swiper-slide v-for="similar in similarMovie" :key="similar.filmId">
            <movie-card
              :isFavorite="isFavoriteMovie(similar)"
              @toggleFavoriteMovie="toggleFavoriteMovies(similar)"
              :movie="similar"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import MovieCard from "@/components/MovieCard.vue";
import { mapActions, mapGetters, mapState, mapMutations } from "vuex";
import CustomLoader from "@/components/UI/CustomLoader.vue";

export default {
  components: {
    Swiper,
    SwiperSlide,
    MovieCard,
    CustomLoader,
  },
  name: "movie-page",
  data() {
    return {
      movie: {},
      similarMovie: [],
      isLoading: true,
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
    this.fetchPremierMovies(this.$route.params.id);
    this.fetchSimilarsMovies(this.$route.params.id);
  },
  computed: {
    ...mapState({
      favoriteId: (state) => state.movie.favoriteId,
    }),
  },
  methods: {
    ...mapMutations({
      setHistory: "movie/setHistory",
      toggleFavoriteMovies: "movie/toggleFavoriteMovies",
    }),
    isFavoriteMovie(movie) {
      return this.favoriteId.includes(movie.filmId);
    },
    async fetchPremierMovies(param) {
      try {
        this.isLoading = true;
        const response = await fetch(
          `https://kinopoiskapiunofficial.tech/api/v2.2/films/${param}`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": process.env.VUE_APP_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        this.movie = data;
        this.setHistory(data);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchSimilarsMovies(param) {
      try {
        // commit("setIsPremierMovieLoading", true);
        const response = await fetch(
          `https://kinopoiskapiunofficial.tech/api/v2.2/films/${param}/similars`,
          {
            method: "GET",
            headers: {
              "X-API-KEY": process.env.VUE_APP_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        this.similarMovie = data.items.slice(0, 10);
      } catch (error) {
        console.log(error);
        this.$router.push({name: 'error'})
      } finally {
      }
    },
    formatFilmLength(filmLength) {
      if (filmLength === 0) {
        return "-";
      } else if (filmLength < 60) {
        return filmLength + " мин";
      } else if (filmLength % 60 === 0) {
        return Math.round(filmLength / 60) + " ч";
      } else {
        return Math.round(filmLength / 60) + " ч " + (filmLength % 60) + " мин";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.background {
  height: 600px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background: linear-gradient(
      180deg,
      rgba(19, 23, 32, 0.5) 0%,
      var(--color-main) 100%
    );
    pointer-events: none;
  }
}

.wrapper {
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 2;

  .content {
    max-width: 900px;
    .title {
      margin-top: 200px;
      font-size: 40px;
      font-weight: 400;
    }

    .list {
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      li {
        margin-right: 20px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
        line-height: 28px;
        font-weight: 200;
        color: #fff;
        padding-left: 20px;
        position: relative;
      }
      li:before {
        content: "";
        position: absolute;
        display: block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: var(--color-primary);
        left: -2px;
        top: 50%;
        margin-top: -3px;
      }
      li:first-child {
        padding-left: 0;
      }
      li:first-child::before {
        display: none;
      }
    }
    .description {
      margin-top: 30px;
      font-size: 16px;
      font-weight: 200;
      line-height: 30px;
    }
  }

  .poster {
    margin-top: 100px;
    max-width: 300px;
    height: 440px;
    border-radius: 15px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.similar-movies {
  position: relative;
  z-index: 1;
  padding: 120px 0;
  .slider {
    margin-top: 40px;
  }
}

.loader {
  margin-top: 20%;
}
@media (max-width: 680px) {
  .wrapper {
    .content {
      .title {
        margin-top: 30px;
      }
    }
  }
  .poster {
    display: none;
  }
  .similar-movies {
    padding: 60px 0;
  }
}
</style>