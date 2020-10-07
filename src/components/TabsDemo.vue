<template>
  <DemoCard :component="tabsDemo"></DemoCard>
</template>
<script lang="ts">
import tabsDemo from './demo/tabsDemo.vue';
import DemoCard from './public/DemoCard.vue';

export default {
  components: {DemoCard},
  setup() {
    return {
      tabsDemo,
    };
  }
};
</script>
<style lang="sass">

</style>

