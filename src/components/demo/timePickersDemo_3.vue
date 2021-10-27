<demo>
<h2>基本操作</h2>
<p></p>
</demo>
<template>
  <p>__{{value1}}__</p>
  <TimePickers
      v-model:picker="value1"
      :width="500"
      :allowed-hours="allowedHours"
      :allowed-minutes="allowedMinutes"
  />
</template>
<script lang="ts">
import TimePickers from '../../lib/TimePickers/index.vue';
import {ref, watch} from 'vue';

export default {
  components: {
    TimePickers
  },
  setup() {
    const allowedHours = v => v % 5;
    const allowedMinutes = v => v > 10 && 50 > v;
    const value1 = ref(null);
    return {
      value1,
      allowedHours,
      allowedMinutes,
    };
  },
};
</script>
