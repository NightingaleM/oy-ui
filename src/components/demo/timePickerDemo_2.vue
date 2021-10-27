<demo>
<h2>禁止交互</h2>
<div>
  <p><code>disabled:boolean</code>禁止与组件交互，默认为false。</p>
</div>
</demo>
<template>
  <div class="box">
    <timePicker
        v-model:picker="value1"
        format="ampm"
        disabled
    />
  </div>

</template>
<script lang="ts">
import timePicker from '../../lib/timePicker/index.vue';
import {ref, watch} from 'vue';

export default {
  components: {
    timePicker
  },
  setup() {
    const value1 = ref('07:05:00');
    return {
      value1
    };
  },
};
</script>
<style>
.box {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.picker {
  margin-bottom: 20px;
}
</style>
