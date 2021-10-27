<demo>
<h2>指定面板</h2>
<div>
  <p><code>target:'h'|'m'|'s'</code>可以指定初始化时所在"时"、"分"、"秒"中的某个面板。</p>
  <p><code>@targetChange</code>当面板发生改变时将触发此方法。</p>
</div>
</demo>
<template>
  <p>__{{ value1 }}__</p>
  <timePicker
      v-model:picker="value1"
      :width="500"
      use-seconds
      @targetChange="targetChangeHandle"
      target="s"
  />
</template>
<script lang="ts">
import timePicker from '../../lib/TimePicker/index.vue';
import {ref, watch} from 'vue';

export default {
  components: {
    timePicker
  },
  setup() {
    const targetChangeHandle = v => {
      console.log(v);
    };
    const value1 = ref(null);
    return {
      value1,
      targetChangeHandle,
    };
  },
};
</script>
v
