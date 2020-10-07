<template>
  <DemoCard :component="switchDemo"></DemoCard>
</template>
<script lang="ts">
import switchDemo from './demo/switchDemo.vue';
import DemoCard from './public/DemoCard.vue';

export default {
  components: {DemoCard},
  setup() {
    return {
      switchDemo,
    };
  }
};
</script>
