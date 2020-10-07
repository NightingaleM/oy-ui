<template>

  <DemoCard :source-code="switchDemo.__sourceCode">
    <template v-slot:title>
      <h2>{{ switchDemo.__sourceCodeTitle }}</h2>
    </template>
    <template v-slot:default>
      <component :is="switchDemo"/>
    </template>
  </DemoCard>
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
