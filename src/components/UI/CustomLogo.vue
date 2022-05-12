<template>
  <a href="#" class="logo">TheseAre<span>Movies</span></a>
</template>

<script>
export default {
  name: "custom-logo",
};
</script>

<style scoped lang="scss">
.logo {
  display: block;
  font-size: 22px;
  font-weight: 700;
  span {
    color: var(--color-primary);
  }
}
</style>