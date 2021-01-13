<template>
  <h2>Pagination 示例</h2>
  <DemoCard :component="paginationDemo_1"></DemoCard>
  <DemoCard :component="paginationDemo_2"></DemoCard>
  <DemoCard :component="paginationDemo_3"></DemoCard>
  <!--  <DemoCard :component="dialogDemoOnlyButton"></DemoCard>-->
</template>
<script lang="ts">
import DemoCard from './public/DemoCard.vue';
import paginationDemo_1 from './demo/paginationDemo_1.vue';
import paginationDemo_2 from './demo/paginationDemo_2.vue';
import paginationDemo_3 from './demo/paginationDemo_3.vue';

export default {
  components: {
    DemoCard
  },
  setup(props, context) {
    return {
      paginationDemo_1,
      paginationDemo_2,
      paginationDemo_3
    };
  },
};
</script>
<style lang="scss">

</style>
