<template>
  <div class="top-nav">
    <div class="toggle" @click="toggleMenu">O</div>
    <router-link to="/" class="logo">
      <span>O</span>Y_U<span>I</span>
    </router-link>
    <ul>
      <li>
        <router-link to="/doc">文档</router-link>
      </li>
    </ul>
  </div>

</template>
<script lang="ts">
import {inject, Ref} from 'vue';

export default {
  setup() {
    const menuVisible = inject<Ref<boolean>>('menuVisible'); // get
    const toggleMenu = () => {
      menuVisible.value = !menuVisible.value;
    };
    return {menuVisible, toggleMenu};
  },
};
</script>
<style lang="scss" scoped>
.top-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  position: sticky;
  top: 0;

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, rgba(227, 255, 253, 1) 0%, rgba(183, 233, 230, 1) 100%);
  }

  .toggle {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 10px;

    display: none;
  }
  .logo {
    margin-right: auto;
    span {
      color: rgb(187, 231, 228)
    }
  }

  ul {
    li {

    }
  }
  a {
    color: #1d2c40;;
    text-decoration: none;
  }
  @media (max-width: 650px) {
    .toggle{
      display: block;
    }
    .logo{
      margin: 0;
    }
    ul {
      display: none;
    }
  }
}
</style>
