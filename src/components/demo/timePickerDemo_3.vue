<demo>
<h2>自定义选择范围</h2>
<div>
  <p><code>allowed-hours,allowed-minutes,allowed-seconds</code>允许传入一个函数，这个函数接受的参数是一个数字，返回结果是布尔值，真值表示传入的数字能被选择，假值则不可被选择。
  </p>
</div>
</demo>
<template>
  <p>__{{ value1 }}__</p>
  <timePicker
      v-model:picker="value1"
      :width="500"
      use-seconds
      :allowed-hours="allowedHours"
      :allowed-minutes="allowedMinutes"
      :allowed-seconds="allowedSeconds"
  />
</template>
<script lang="ts">
import timePicker from '../../lib/timePicker/index.vue';
import {ref, watch} from 'vue';

export default {
  components: {
    timePicker
  },
  setup() {
    const allowedHours = v => v % 5;
    const allowedMinutes = v => v > 10 && 50 > v;
    const allowedSeconds = v => v % 4;
    const value1 = ref(null);
    return {
      value1,
      allowedHours,
      allowedMinutes,
      allowedSeconds
    };
  },
};
</script>
