<template>
  <h2>Button 示例</h2>
  <DemoCard v-for="(item,index) in demo"
            :key="index"
            :component="item">
  </DemoCard>
</template>
<script lang="ts">
import DemoCard from './public/DemoCard.vue';
import buttonDemo_1 from './demo/buttonDemo_1.vue';
import buttonDemo_2 from './demo/buttonDemo_2.vue';
import buttonDemo_3 from './demo/buttonDemo_3.vue';
import buttonDemo_4 from './demo/buttonDemo_4.vue';

export default {
  components: {DemoCard},
  setup() {
    return {
      demo: [
        buttonDemo_1,
        buttonDemo_2,
        buttonDemo_3,
        buttonDemo_4,
      ],
    };
  }
};
</script>
