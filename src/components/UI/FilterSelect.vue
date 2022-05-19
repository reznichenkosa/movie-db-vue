<template>
  <select class="filter-select"
  :style="{
        background: `var(--color-main) url(${require('@/assets/icons/caret-down.svg')}) no-repeat 95% 55%`}">
    <option value="" disabled selected>{{ selectedDefaultOption }}</option>
    <option
      :selected="currentParam === (param.value || param.id) ? true : null"
      v-for="param in params"
      :key="param.value || param.id"
      :value="param.id || param.value"
    >
      {{ param.genre || param.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "filter-select",
  props: {
    params: {
      type: Array,
      required: true,
    },
    selectedDefaultOption: {
      type: String,
      required: true,
    },
    currentParam: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.filter-select {
  border: none;
  color: white;
  font-weight: 400;
  cursor: pointer;
  padding: 10px;
  border-radius: 15px;
  padding: 0 30px 0 20px;
  transition: ease 0.3s;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &:focus {
    outline: none;
  }
}
</style>