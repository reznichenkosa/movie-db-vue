<template>
  <button class="more-btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "more-btn",
};
</script>

<style lang="scss" scoped>
.more-btn {
  background-color: var(--color-alt);
  border: none;
  color: white;
  font-weight: 400;
  cursor: pointer;
  padding: 20px 30px;
  border-radius: 15px;
  text-transform: uppercase;
  transition: ease 0.3s;
  &:hover {
    background-color: var(--color-primary);
    color: #fff;
  }
}
</style>