<template>
  <DemoCard :component="dialogDemo"></DemoCard>
  <DemoCard :component="dialogDemoOnlyButton"></DemoCard>
</template>
<script lang="ts">
import DemoCard from './public/DemoCard.vue';
import Button from '../lib/Button.vue';
import dialogDemo from './demo/dialogDemo.vue';
import dialogDemoOnlyButton from './demo/dialogDemoOnlyButton.vue';

export default {
  components: {
    Button, DemoCard
  },
  setup(props, context) {
    return {
      dialogDemoOnlyButton,
      dialogDemo,
    };
  },
};
</script>
<style lang="scss">

</style>
