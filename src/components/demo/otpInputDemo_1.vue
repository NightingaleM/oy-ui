<demo>
<div>
  <h2>基本用法</h2>
  <p><code>type?:'password' | 'text' | 'number'</code> 默认为 <code>'text'</code>。
  </p>
  <p><code>length?:number</code> 默认为 <code>6</code></p>
  <p><code>disabled?:boolean</code> 默认为 <code>false</code></p>
  <p><code>@finish</code> 事件将在所有输入框都输入完毕后触发。</p>
  <p>可以直接粘贴内容，自动填充</p>
</div>
</demo>

<template>
  <div>
    <p>value1: {{ value1 }}</p>
    <OTPInput v-model:value=value1 :length="8"/>
    <p>value2（number）: {{ value2 }}</p>
    <OTPInput v-model:value=value2
              type="number"
              :length="4"
    ></OTPInput>
    <p>value3: {{ value3 }}</p>
    <OTPInput v-model:value=value3
              @finish='finished'
              type="password"
    ></OTPInput>
    <p>value4: {{ value4 }}</p>
    <OTPInput v-model:value=value4 :disabled="true"/>
  </div>

</template>
<script lang="ts">
import OTPInput from '../../lib/OTPInput/index.vue';
import {defineComponent, ref} from 'vue';

export default defineComponent({
  components: {OTPInput},
  setup() {
    const value1 = ref('default1');
    const value2 = ref('');
    const value3 = ref('');
    const value4 = ref('');
    const finished = value => {
      console.log('finished: ', value);
    };
    return {
      finished,
      value1, value2, value3, value4
    };
  }
});
</script>
