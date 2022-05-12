<template>
  <select class="filter-select" name="" id="">
    <option value="">Все жанры</option>
  </select>
</template>

<script>
export default {
  name: "filter-select",
};
</script>

<style scoped lang="scss">
.filter-select {
    background: none;
    border: none;
    color: #ffffff;
    cursor: pointer;

    &:focus {
        outline: none;
    }
}
</style>