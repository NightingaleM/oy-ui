<template>
  <DemoCard :source-code="dialogDemo.__sourceCode">
    <template v-slot:title>
      <h2>使用插槽弹窗</h2>
    </template>
    <template v-slot:default>
      <component :is="dialogDemo"/>
    </template>
  </DemoCard>
  <DemoCard :source-code="dialogDemoOnlyButton.__sourceCode">
    <template v-slot:title>
    <h2>使用函数弹窗</h2>
    </template>
    <template v-slot:default>
    <component :is="dialogDemoOnlyButton"/>
    </template>
  </DemoCard>

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
