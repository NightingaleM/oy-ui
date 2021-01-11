<template>
  <DemoCard :component="TreeviewDemo"></DemoCard>

</template>
<script lang="ts">

import TreeviewDemo from './demo/treeviewDemo_1.vue';
import DemoCard from './public/DemoCard.vue';

export default {
  components: {DemoCard},
  setup() {
    return {TreeviewDemo};
  }
};
</script>
<style lang="sass">

</style>

