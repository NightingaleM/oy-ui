<template>
  <router-view />
</template>

<script lang="ts">
import { ref, provide } from "vue";
import { router } from "./router";

export default {
  name: "App",
  setup() {
    const width = document.documentElement.clientWidth;
    let menuVisible = ref(width <= 500 ? false : true);
    window.addEventListener('resize',()=>{
      console.log('发发发');
      const width = document.documentElement.clientWidth;
      menuVisible = ref(width <= 500 ? false : true);
    })
    provide("menuVisible", menuVisible); // set
    router.afterEach(() => {
      if (width <= 500) {
        menuVisible.value = false;
      }
    });
  },
};
</script>
