<template>
  <base-layout>
    <router-view></router-view>
  </base-layout>
</template>

<script>
import BaseLayout from '@/components/Layout/BaseLayout.vue';

export default {
  components: {
    BaseLayout,
  },
};
</script>
