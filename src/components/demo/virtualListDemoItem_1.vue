<demo>
<h2>Item组件</h2>
</demo>
<template>
  <div :style="{
    backgroundColor:infos?.color ?? 'rgb(172,72,43)'
  }">
    <p>这个颜色是：{{ infos?.color ?? 'rgb(172,72,43)' }}</p>
  </div>
</template>
<script lang="ts">


import {defineComponent} from 'vue';

export default defineComponent({
  props: {
    infos: Object
  },
  setup(props, context) {
  }
});
</script>
<style scoped lang="scss">
div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 50px;

  p {
    font-size: 16px;
  }
}
</style>
