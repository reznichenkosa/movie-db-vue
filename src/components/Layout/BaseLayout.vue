<template>
  <custom-header />
    <main class="main">
        <slot></slot>
    </main>
  <custom-footer />
</template>

<script>
import CustomFooter from '@/components/Layout/CustomFooter.vue';
import CustomHeader from '@/components/Layout/CustomHeader.vue';

export default {
  components: { CustomFooter, CustomHeader },
  name: 'base-layout',
};
</script>

<style>
.main {
    flex: 1 1 auto;
    position: relative;
}
</style>
