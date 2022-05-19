<template>
  <nav>
    <ul class="links">
      <li class="link"><a href="#">Главная</a></li>
      <li class="link"><a href="#">Каталог</a></li>
      <li class="link"><a href="#">О сайте</a></li>
      <li class="link"><a href="#">Контакты</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
    name: 'custom-nav',
};
</script>

<style scoped lang="scss">
.links {
  display: flex;
  font-size: 14px;
  line-height: 14px;
  font-weight: 400;
}

.link {
  margin-right: 50px;
  transition: 0.3s;
  &:last-child {
    margin-right: 0;
  }

  &:hover {
      color: var(--color-primary);
  }

}
</style>