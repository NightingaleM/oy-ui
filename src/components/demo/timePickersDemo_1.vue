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
      disabled
      v-model:picker="value2"
      format="ampm"
      use-seconds
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
    const value2 = ref('17:01:01');
    const value1 = ref('22:44:00');
    watch(value2, () => {
      console.log(value2.value);
    });
    setInterval(() => {
      const now = new Date();
      value2.value = `${now.getHours()}:${now.getMinutes() > 10 ? now.getMinutes() : '0' + +now.getMinutes()}:${now.getSeconds() > 10 ? now.getSeconds() : '0' + +now.getSeconds()}`;
    }, 1000);
    return {
      value1, value2,
      allowedHours,
      allowedMinutes,
    };
  },
};
</script>
