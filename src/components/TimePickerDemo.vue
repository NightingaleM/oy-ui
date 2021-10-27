<template>
  <h2>timePicker 示例</h2>
  <DemoCard v-for="demo in demos" :component="demo"/>
</template>
<script lang="ts">
import DemoCard from './public/DemoCard.vue';
import timePickerDemo_1 from './demo/timePickerDemo_1.vue';
import timePickerDemo_2 from './demo/timePickerDemo_2.vue';
import timePickerDemo_3 from './demo/timePickerDemo_3.vue';
import timePickerDemo_4 from './demo/timePickerDemo_4.vue';

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
