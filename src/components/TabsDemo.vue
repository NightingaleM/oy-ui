<template>
  <DemoCard :source-code="tabsDemo.__sourceCode">
    <template v-slot:title>
      <h2>{{ tabsDemo.__sourceCodeTitle }}</h2>
    </template>
    <template v-slot:default>
      <component :is="tabsDemo"/>
    </template>
  </DemoCard>
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

