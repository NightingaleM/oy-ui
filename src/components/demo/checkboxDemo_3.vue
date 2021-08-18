<demo>
<h2>多选框组</h2>
<div>
  <p>通过 <code>options</code> 来设定要渲染的多选框。</p>
  <p><code>options</code> 可以是 <code>string[]</code></p>
  <p>也可以是<code>{value:string,label?:string,disabled?:boolean}[]</code></p>
  <p>同样也是通过 <code>block</code> 来控制是行内元素还是块级元素</p>
</div>
</demo>
<template>
  <CheckboxGroup block @checkChange="changeHandle1" :options="options1" :value="value1"></CheckboxGroup>
  <p>------------------------------</p>
  <CheckboxGroup @checkChange="changeHandle2" :options="options2" :value="value2"></CheckboxGroup>
</template>
<script lang="ts">
import CheckboxGroup from '../../lib/CheckboxGroup.vue';
import {ref} from 'vue';

export default {
  components: {
    CheckboxGroup
  },
  setup() {
    const changeHandle1 = (v) => {
      const {status, label} = v;
      value1.value = status;
    };
    const value1 = ref(['你']);
    const options1 = ['你', '我', '他'];
    const changeHandle2 = (v) => {
      const {status, label} = v;
      value2.value = status;
    };
    const value2 = ref(['睡觉', '吃饭']);
    // 只是用于展示可以的写法，代码规范自己注意
    const options2 = [
      {value: '上厕所', label: '上厕所'},
      {value: '打游戏', label: '', disabled: false},
      {value: '洗澡', label: '洗澡', disabled: false},
      {value: '吃饭', label: '吃饭', disabled: true},
      {value: '睡觉', disabled: true},
      {value: '干坏事', disabled: true},
    ];
    return {
      changeHandle1,
      value1,
      options1,
      changeHandle2,
      value2,
      options2
    };
  }
};
</script>
