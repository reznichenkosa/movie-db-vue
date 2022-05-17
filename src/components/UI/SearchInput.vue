<template>
  <div class="field">
    <input type="text" id="search" autocomplete="off" required />
    <label for="search" data-label="Поиск" data-placeholder="Я ищу..."></label>
    <button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-search"
        viewBox="0 0 16 16"
      >
        <path
          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  name: "search-input",
};
</script>

<style scoped lang="scss">
.field {
  display: flex;
  position: relative;

  input {
    width: 300px;
    height: 40px;
    background-color: var(--color-main);
    border: none;
    border-radius: 15px;
    padding: 0 40px 0 20px;
    color: #ffffff;
    font-weight: 200;
    font-size: 14px;
    &:valid,
    &:focus {
      outline: none;
    }
    &:valid + label:before,
    &:focus + label:before {
      opacity: 0;
      transform: translateY(-50%) translateX(100%);
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
      transition: ease 0.5s;
      cursor: text;
    }
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    color: var(--color-primary);
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: ease 0.3s;
    &:hover {
      color: #ffffff;
    }
  }
}
</style>