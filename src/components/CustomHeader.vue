<template>
  <header class="header">
    <div class="wrapper container">
      <div class="logo"><a href="#">TheseAre<span>Movie</span></a></div>
      <nav class="navigation">
        <ul class="links">
          <li class="link"><a href="#">Главная</a></li>
          <li class="link"><a href="#">Каталог</a></li>
          <li class="link"><a href="#">О сайте</a></li>
          <li class="link"><a href="#">Контакты</a></li>
        </ul>
      </nav>
      <div class="search-box">
        <div class="field">
          <input type="text" id="search" autocomplete="off" required/>
          <label for="search" data-label="Поиск" data-placeholder="Я ищу..."></label>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
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

  .logo {
    font-size: 22px;
    font-weight: 700;
    span {
      color: var(--color-primary);
    }
  }

  .links {
   display: flex;
   font-size: 14px;
   line-height: 14px;
   font-weight: 400;
  }

  .link {
    margin-right: 50px;

    &:last-child {
      margin-right: 0;
    }

    a {
      transition: .3s;
      &:hover {
        color: var(--color-primary);
      }
    }
  }
}

.field {
  display: flex;
  position: relative;

  input {
    width: 200px;
    height: 40px;
    background-color: var(--color-alt);
    border: none;
    border-radius: 15px;
    padding: 0 20px 0;
    color: #ffffff;
    font-weight: 200;
    font-size: 14px;
    &:valid,
    &:focus {
      outline: none;
    }
    &:valid + label:before,
    &:focus + label:before {
        content: attr(data-label);
        transform: translateX(calc(-100% - 35px)) translateY(-50%);
        cursor: auto;
    }
  }

  label {
    &:before {
      content: attr(data-placeholder);
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      font-weight: 200;
      font-size: 14px;
      transition: ease .5s;
      cursor: text;
    }
  }
}
</style>
