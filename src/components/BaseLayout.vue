<template>
  <custom-header/>
    <main class="main">
        <slot></slot>
    </main>
  <custom-footer/>
</template>

<script>
import CustomFooter from './CustomFooter.vue';
import CustomHeader from './CustomHeader.vue';

export default {
  components: { CustomHeader, CustomFooter },
  name: 'base-layout',
};
</script>

<style>
.main {
    flex: 1 1 auto;
}
</style>
