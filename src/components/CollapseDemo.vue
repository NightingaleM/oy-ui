<template>
  <h2>Collapse 示例</h2>
  <!--  <DemoCard v-for="(item,index) in demo"-->
  <!--            :key="index"-->
  <!--            :component="item">-->
  <!--  </DemoCard>-->
  <DemoCard :component="collapseDemo_1">

  </DemoCard>
</template>
<script lang="ts">
import DemoCard from './public/DemoCard.vue';
import collapseDemo_1 from './demo/collapseDemo_1.vue';

export default {
  components: {DemoCard, collapseDemo_1},
  setup() {
    return {
      demo: '',
      // DemoCard,
      collapseDemo_1
    };
  }
};
</script>
