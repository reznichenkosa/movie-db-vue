<template>
  <header class="header">
    <div class="wrapper container">
      <custom-logo />
      <!-- <custom-nav /> -->
    </div>
  </header>
</template>

<script>
import SearchInput from '@/components/UI/SearchInput.vue';
import CustomLogo from '@/components/UI/CustomLogo.vue';
export default {
  components: { CustomLogo, SearchInput },
  name: 'custom-header',
};
</script>

<style scoped lang="scss">
.header {
  // position: sticky;
  // top: 0;
  // z-index: 100;
  background-color: var(--color-main);
}
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
}
</style>
