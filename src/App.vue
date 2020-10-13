<template>
  <div class="fix-side-bar" v-if="isPhone && menuVisible" @click.stop="toggle">
    <SideBar/>
  </div>
  <router-view/>
</template>

<script lang="ts">
import {ref, provide} from 'vue';
import {router} from './router';
import SideBar from './components/nav/SideBar.vue';

export default {
  components: {SideBar},
  name: 'App',
  setup() {
    const width = document.documentElement.clientWidth;
    let menuVisible = ref(width <= 650 ? false : true);
    let isPhone = ref(width > 650 ? false : true);
    window.addEventListener('resize', () => {
      const width = document.documentElement.clientWidth;
      menuVisible.value = width <= 650 ? false : true;
      isPhone.value = width > 650 ? false : true;
    });
    provide('menuVisible', menuVisible); // set
    provide('isPhone', menuVisible); // set
    router.afterEach(() => {
      if (width <= 650) {
        menuVisible.value = false;
        isPhone.value = true;
      }
    });
    const toggle = () => {
      menuVisible.value = !menuVisible.value;
    };
    return {isPhone, toggle, menuVisible};
  },
};
</script>

<style lang="scss" scoped>
.fix-side-bar {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
}
</style>
