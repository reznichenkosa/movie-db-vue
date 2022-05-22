<template>
  <transition name="movie-transition" appear mode="out-in">
    <div class="movie-card">
      <router-link
        :to="{ path: `/movies/${movie.filmId || movie.kinopoiskId}` }"
        class="wrapper"
      >
        <img
          :src="movie.posterUrlPreview || movie.posterUrl"
          :alt="movie.nameRu"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="50"
          fill="currentColor"
          class="bi bi-play-circle"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"
          />
        </svg>
      </router-link>
      <button @click="$emit('toggleFavoriteMovie', movie)" class="favorite">
        <svg
          v-if="!isFavorite"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-bookmark"
          viewBox="0 0 16 16"
        >
          <path
            d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"
          />
        </svg>
        <svg
          v-if="isFavorite"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-bookmark-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"
          />
        </svg>
      </button>
      <span v-if="movie.rating" class="rating"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-star"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
          /></svg
        >{{ movie.rating || movie.ratingAwait }}</span
      >
      <h2 class="title">
        <a href="#">{{ movie.nameRu }}</a>
      </h2>
      <ul class="tags">
        <li v-for="genre in movie?.genres?.slice(0, 2)" :key="genre">
          {{ genre.genre }}
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  name: "movie-card",
  emits: ["toggleFavoriteMovie"],
  props: {
    movie: {
      type: Object,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.movie-card {
  position: relative;
  overflow: hidden;

  &:hover .wrapper img {
    transform: scale(1.1);
    filter: blur(5px);
  }

  &:hover .wrapper svg {
    opacity: 1;
    transform: translateX(-50%) translateY(-50%) scale(1);
  }

  &:hover .wrapper::before {
    opacity: 0.5;
  }

  &:hover .favorite,
  &:hover .rating {
    opacity: 1;
    transform: scale(1);
  }

  &:hover .title {
    color: var(--color-primary);
  }

  .wrapper {
    overflow: hidden;
    display: block;
    position: relative;
    border-radius: 15px;
    height: 350px;
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      height: 100%;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.1) 0%,
        rgba(0, 0, 0, 0.8) 75%,
        rgba(0, 0, 0, 0.9) 100%
      );
      opacity: 0;
      transition: ease 0.5s;
      pointer-events: none;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: ease 0.3s;
    }

    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 3;
      transform: translateX(-50%) translateY(-50%) scale(0.5);
      opacity: 0;
      transition: ease 0.5s;
      cursor: pointer;
    }
  }
  .favorite {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 20px;
    top: 20px;
    padding: 8px;
    border: none;
    background: rgba($color: #000000, $alpha: 0.6);
    border-radius: 10px;
    color: var(--color-primary);
    z-index: 3;
    opacity: 0;
    transform: scale(0.5);
    transition: ease 0.5s;
    cursor: pointer;

    &:hover {
      color: #ffffff;
    }
  }
  .rating {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 20px;
    top: 20px;
    padding: 8px;
    border: none;
    background: rgba($color: #000000, $alpha: 0.6);
    border-radius: 10px;
    color: #ffffff;
    font-size: 14px;
    line-height: 14px;
    z-index: 3;
    opacity: 0;
    pointer-events: none;
    transform: scale(0.5);
    transition: ease 0.5s;

    & svg {
      color: var(--color-primary);
      margin-right: 5px;
    }
  }
  .title {
    margin-top: 10px;
    font-size: 16px;
    font-weight: 400;
    transition: ease 0.3s;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .tags {
    margin-top: 10px;
    display: flex;
    li {
      margin-right: 15px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.movie-transition {
  opacity: 0;
  transition: all 0.5s ease;
}
.movie-transition-enter-active,
.movie-transition-leave-active {
  transition: all 0.5s ease;
}
.movie-transition-enter-from,
.movie-transition-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.movie-transition-move {
  transition: all 0.5s ease;
}
</style>