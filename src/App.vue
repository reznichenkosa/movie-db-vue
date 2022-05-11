<template>
  <base-layout>
    <home-page/>
  </base-layout>
</template>

<script>
import HomePage from '@/pages/HomePage.vue';
import BaseLayout from '@/components/Layout/BaseLayout.vue';

export default {
  components: {
    HomePage,
    BaseLayout,
  },
};
</script>
