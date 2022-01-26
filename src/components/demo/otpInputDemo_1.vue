<demo>
<h2>基本用法</h2>
</demo>

<template>
  <div>
    <OTPInput v-model:value=value1
              @finish='finished'
              type="password"
    ></OTPInput>
  </div>
</template>
<script lang="ts">
import OTPInput from '../../lib/OTPInput/index.vue';
import {defineComponent, ref} from 'vue';

export default defineComponent({
  components: {OTPInput},
  setup() {
    const value1 = ref('');
    const finished = value => {
      console.log('finished: ', value);
    };
    return {
      finished,
      value1
    };
  }
});
</script>
