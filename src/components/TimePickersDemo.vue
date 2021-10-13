<template>
  <h2>TimePickers 示例</h2>
  <DemoCard :component="timePickerDemo_1" />
</template>
<script lang="ts">
import DemoCard from './public/DemoCard.vue';
import timePickerDemo_1 from './demo/timePickersDemo_1.vue'

export default {
  components: {DemoCard, timePickerDemo_1},
  setup() {
    return {
      demo: '',
      // DemoCard,
      timePickerDemo_1
    };
  }
};
</script>
