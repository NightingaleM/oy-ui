<template>
  <h2>TimePickers 示例</h2>
  <DemoCard v-for="demo in demos" :component="demo"/>
</template>
<script lang="ts">
import DemoCard from './public/DemoCard.vue';
import timePickerDemo_1 from './demo/timePickersDemo_1.vue';
import timePickerDemo_2 from './demo/timePickersDemo_2.vue';
import timePickerDemo_3 from './demo/timePickersDemo_3.vue';
import timePickerDemo_4 from './demo/timePickersDemo_4.vue';

export default {
  components: {DemoCard},
  setup() {
    return {
      // DemoCard,
      demos: [
        timePickerDemo_1, timePickerDemo_2, timePickerDemo_3, timePickerDemo_4
      ]
    };
  }
};
</script>
