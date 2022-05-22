<template>
  <div class="container">
      <div class="wrapper">
        <h2>Что-то пошло не так!!!</h2>
        <filter-button @click="this.$router.push('/')">На главную</filter-button>
      </div>
  </div>
</template>

<script>
import FilterButton from '@/components/UI/FilterButton.vue'
export default {
  components: { FilterButton },
    name: "error-page"
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>