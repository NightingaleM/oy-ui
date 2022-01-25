<demo>
<h2>基本用法</h2>
</demo>

<template>
  <div>
    <OTPInput v-model:value=value1
              @finish='finished'
    ></OTPInput>
  </div>
</template>
<script lang="ts">
import OTPInput from '../../lib/OTPInput/index.vue';
import {ref} from 'vue';

export default {
  components: {OTPInput},
  setup() {
    const value1 = ref('233');
    const finished = value => {
      console.log('finished: ', value);
    };
    return {
      finished,
      value1
    };
  }
};
</script>
