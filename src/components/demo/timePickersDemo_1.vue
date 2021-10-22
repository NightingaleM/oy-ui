<demo>
<h2>基本操作</h2>
<p></p>
</demo>
<template>
  --- {{ value1 }} ---
  <TimePickers
      v-model:picker="value1"
      :width="500"
      :allowed-hours="allowedHours"
      :allowed-minutes="allowedMinutes"
  />
  <p>-----------------</p>
  --- {{ value2 }} ---
  <TimePickers
      v-model:picker="value2"
      format="ampm"
      use-seconds
      :allowed-hours="allowedHours"
      :allowed-minutes="allowedMinutes"
  />
</template>
<script lang="ts">
import TimePickers from '../../lib/TimePickers/index.vue';
import {ref} from 'vue';

export default {
  components: {
    TimePickers
  },
  setup() {
    const allowedHours = v => v % 5;
    const allowedMinutes = v => v > 10 && 50 > v;
    const value1 = ref(null);
    const value2 = ref('22:44:00');
    return {
      value1, value2,
      allowedHours,
      allowedMinutes,
    };
  },
};
</script>
