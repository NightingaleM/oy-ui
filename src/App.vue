<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <router-link to="/">hello word</router-link>
  <router-link to="o">oyy</router-link>
  <hr />

  <router-view msg="2333"></router-view>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import OYY from "./components/OYY.vue";

export default {
  name: 'App',
  components: {
    OYY,
    HelloWorld
  }
}
</script>
