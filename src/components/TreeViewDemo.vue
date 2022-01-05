<template>
  <h2>TreeView 示例</h2>
  <DemoCard :component="TreeViewDemo"></DemoCard>
</template>
<script lang="ts">

import TreeViewDemo from './demo/treeViewDemo_1.vue';
import DemoCard from './public/DemoCard.vue';

export default {
  components: {DemoCard},
  setup() {
    return {TreeViewDemo};
  }
};
</script>
<style lang="scss">

</style>

