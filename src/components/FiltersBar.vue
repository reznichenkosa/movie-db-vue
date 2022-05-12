<template>
  <div class="filter-bar">
    <div class="left">
      <filter-select class="mr-15" />
      <filter-select />
    </div>
    <div class="right">
      <filter-button class="active">Закладки</filter-button>
      <filter-button>Популярное</filter-button>
      <filter-button>Новинки</filter-button>
    </div>
  </div>
</template>

<script>
import FilterButton from "./UI/FilterButton.vue";
import FilterSelect from "./UI/FilterSelect.vue";
export default {
  components: { FilterButton, FilterSelect },
  name: "filters-bar",
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
.right {
  padding: 10px;
  background-color: var(--color-main);
  border-radius: 15px;
}
</style>