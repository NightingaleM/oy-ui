<template>
  <h2>Transfer 示例</h2>
  <DemoCard v-for="(item,index) in demo"
            :key="index"
            :component="item">
  </DemoCard>
</template>
<script lang="ts">
import DemoCard from './public/DemoCard.vue';
import transformDemo_1 from './demo/transferDemo_1.vue';
import transformDemo_2 from './demo/transferDemo_2.vue';

export default {
  components: {DemoCard},
  setup() {
    return {
      demo: [
        transformDemo_1,
        transformDemo_2
      ],
    };
  }
};
</script>
