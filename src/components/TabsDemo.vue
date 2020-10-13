<template>
  <DemoCard :component="tabsDemo"></DemoCard>
  <DemoCard :component="tabsDemo2"></DemoCard>
  <DemoCard :component="tabsDemo3"></DemoCard>
</template>
<script lang="ts">
import tabsDemo from './demo/tabsDemo.vue';
import tabsDemo2 from './demo/tabsDemo2.vue';
import tabsDemo3 from './demo/tabsDemo3.vue';
import DemoCard from './public/DemoCard.vue';

export default {
  components: {DemoCard},
  setup() {
    return {
      tabsDemo,
      tabsDemo2,
      tabsDemo3
    };
  }
};
</script>
<style lang="sass">

</style>

