<demo>
<h2>基本操作</h2>
<p></p>
</demo>
<template>
<!--  <TimePickers-->
<!--      :allowed-hours="allowedHours"-->
<!--      :allowed-minutes="allowedMinutes"-->
<!--  />-->
  <p>-----------------</p>
<!--      format="ampm"-->
  <TimePickers
      use-seconds
      :allowed-hours="allowedHours"
      :allowed-minutes="allowedMinutes"
  />
</template>
<script lang="ts">
import TimePickers from '../../lib/TimePickers/index.vue';

export default {
  components: {
    TimePickers
  },
  setup() {
    const allowedHours = v => v % 5;
    const allowedMinutes = v => v>10 && 50 > v;
    return {
      allowedHours,
      allowedMinutes,
    };
  },
};
</script>
