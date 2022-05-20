<template>
  <base-layout>
    <router-view v-slot="{Component}">
      <transition name="fade" mode="out-in">
        <div :key="$route.path">
          <component :is="Component"/>
        </div>
      </transition>
    </router-view>
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

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: all .7s ease;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(20%);
}
</style>