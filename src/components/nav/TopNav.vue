<template>
  <div class="top-nav">
    <div class="toggle" @click="toggleMenu">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-heng1"></use>
      </svg>
    </div>
    <router-link to="/" class="logo">
      <span>O</span>Y_U<span>I</span>
    </router-link>
    <span class="version">{{ version }}</span>
    <ul>
      <li>
        <router-link to="/doc/intro">文档</router-link>
      </li>
    </ul>
  </div>

</template>
<script lang="ts">
import {inject, Ref} from 'vue';
import config from '../../../package.json';

console.log(config.version);
export default {
  setup() {
    const version = config.version;
    const menuVisible = inject<Ref<boolean>>('menuVisible'); // get
    const toggleMenu = () => {
      menuVisible.value = !menuVisible.value;
    };
    return {menuVisible, toggleMenu, version};
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

    span {
      color: rgb(187, 231, 228)
    }
  }

  .version {
    color:#cccccc;
    padding-top: 5px;
    margin-left: 10px;
    margin-right: auto;
    font-size: 12px;
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
    .toggle {
      display: block;
    }
    .version {
      margin-right: 0;
    }
    ul {
      display: none;
    }
  }
}
</style>
