<template>
  <div class="preloader">
      <span></span>
      <span></span>
      <span></span>
  </div>
</template>

<script>
export default {
    name: 'custom-loader',
}
</script>

<style scoped>
.preloader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}
.preloader span {
  width: 20px;
  height: 20px;
  display: block;
  border-radius: 100%;
  background: dodgerblue;
  margin-right: 5px;
  animation: pulse 1s infinite;
}
.preloader span:last-child {
  margin-right: 0px;
}
@keyframes pulse {
  0% {
    transform: scale(.6);
  } 50% {
    transform: scale(1);
  } 100% {
    transform: scale(.6);
  }
}
</style>