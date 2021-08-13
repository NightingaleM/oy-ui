<template>
  <h2>Button 示例</h2>
  <DemoCard v-for="(item,index) in demo"
            :key="index"
            :component="item">
  </DemoCard>
</template>
<script lang="ts">
import DemoCard from './public/DemoCard.vue';
import checkboxDemo_1 from './demo/checkboxDemo_1.vue';
import checkboxDemo_2 from './demo/checkboxDemo_2.vue';

export default {
  components: {DemoCard},
  setup() {
    return {
      demo: [
        checkboxDemo_1,
        checkboxDemo_2
      ],
    };
  }
};
</script>
