<template>
  <DemoCard :component="switchDemo"></DemoCard>
  <DemoCard :component="switchWithDisable"></DemoCard>
</template>
<script lang="ts">
import switchDemo from './demo/switchDemo.vue';
import switchWithDisable from './demo/switchWithDisable.vue';
import DemoCard from './public/DemoCard.vue';

export default {
  components: {DemoCard},
  setup() {
    return {
      switchWithDisable,
      switchDemo,
    };
  }
};
</script>
