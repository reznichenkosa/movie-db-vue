<template>
  <button class="filter-btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "filter-btn",
};
</script>

<style scoped lang="scss">
.filter-btn {
  background: none;
  border: none;
  color: white;
  font-weight: 400;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  transition: ease 0.3s;
  &:hover {
    color: var(--color-primary);
  }
}
.active {
  background-color: var(--color-alt);
  color: var(--color-primary);
}
</style>