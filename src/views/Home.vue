<template>
  <div class="top-nav-and-banner">
    <Topnav/>
    <div class="banner">
      <h1>OY_UI</h1>
      <h2>一个UI 框架</h2>
      <p class="actions">
        <a href="https://github.com">GitHub</a>
        <router-link to="/doc">开始</router-link>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import Topnav from '../components/Topnav.vue';

export default {
  components: {Topnav},
};
</script>
<style lang="scss" scoped>
.top-nav-and-banner {
  background: linear-gradient(90deg, rgba(227, 255, 253, 1) 0%, rgba(183, 233, 230, 1) 100%);
}

.banner {
  color: #28d1c9;
  padding: 100px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  //background: lightgreen;
  > .actions {
    padding: 8px 0;

    a {
      color: #1d2c40;
      margin: 0 8px;
      background: #fff;
      display: inline-block;
      $h: 28px;
      height: $h;
      line-height: $h;
      border-radius: $h/2;
      padding: 0 8px;
    }
  }
}
</style>
