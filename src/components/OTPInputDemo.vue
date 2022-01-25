<template>
  <h2>OTP Input 示例</h2>
  <DemoCard :component="otpInputDemo"></DemoCard>
</template>
<script lang="ts">
import otpInputDemo from './demo/otpInputDemo_1.vue';
import DemoCard from './public/DemoCard.vue';

export default {
  components: {DemoCard},
  setup() {
    return {
      otpInputDemo,
    };
  }
};
</script>
