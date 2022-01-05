<template>
  <h2>Virtual List 示例</h2>
  <DemoCard :component="virtualListDemo_1"></DemoCard>
  <DemoCard :component="virtualListDemo_2"></DemoCard>
  <DemoCard :component="virtualListDemoItem_1"></DemoCard>
</template>
<script lang="ts">

import virtualListDemo_1 from './demo/virtualListDemo_1.vue';
import virtualListDemo_2 from './demo/virtualListDemo_2.vue';
import virtualListDemoItem_1 from './demo/virtualListDemoItem_1.vue';
import DemoCard from './public/DemoCard.vue';

export default {
  components: {DemoCard},
  setup() {
      return {virtualListDemo_1,virtualListDemo_2,virtualListDemoItem_1};
  }
};
</script>
<style lang="sass">

</style>

