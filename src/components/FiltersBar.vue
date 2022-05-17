<template>
  <div class="filter-bar">
    <div class="left">
      <search-input class="mr-15" />
      <filter-select class="mr-15" />
      <filter-select />
    </div>
    <div class="right">
      <filter-button
        :class="{ active: currentCategory === 'TOP_100_POPULAR_FILMS' }"
        @click="$emit('changeCurrentCategory', 'TOP_100_POPULAR_FILMS')"
      >
        Популярные ТОП 100
      </filter-button>
      <filter-button
        :class="{ active: currentCategory === 'TOP_250_BEST_FILMS' }"
        @click="$emit('changeCurrentCategory', 'TOP_250_BEST_FILMS')"
      >
        Лучшие ТОП 250
      </filter-button>
      <filter-button
        :class="{ active: currentCategory === 'FAVORITE' }"
        @click="$emit('changeCurrentCategory', 'FAVORITE')"
        >Избранное</filter-button
      >
    </div>
  </div>
</template>

<script>
import FilterButton from "./UI/FilterButton.vue";
import FilterSelect from "./UI/FilterSelect.vue";
import SearchInput from "./UI/SearchInput.vue";

export default {
  components: { FilterButton, FilterSelect, SearchInput },
  name: "filters-bar",
  emits: ['changeCurrentCategory'],
  props: {
    currentCategory: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.filter-bar {
  //   position: sticky;
  //   top: 0;
  //   z-index: 100;
  min-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 0 40px;
  background-color: var(--color-alt);
  border-radius: 15px;
}
.left {
  display: flex;
}
.right {
  padding: 10px;
  background-color: var(--color-main);
  border-radius: 15px;
}
</style>