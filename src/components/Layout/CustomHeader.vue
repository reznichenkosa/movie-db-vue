<template>
  <header class="header">
    <div class="wrapper container">
      <custom-logo />
      <custom-nav />
      <search-input />
    </div>
  </header>
</template>

<script>
import CustomNav from '@/components/CustomNav.vue';
import SearchInput from '@/components/UI/SearchInput.vue';
import CustomLogo from '@/components/UI/CustomLogo.vue';
export default {
  components: { CustomLogo, CustomNav, SearchInput },
  name: 'custom-header',
};
</script>

<style scoped lang="scss">
.wrapper {
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
}
</style>
