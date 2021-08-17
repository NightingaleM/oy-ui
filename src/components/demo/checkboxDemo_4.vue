<demo>
<h2>多选框组</h2>
<div>
  <p>在实现全选效果时，你可能会用到 <code>indeterminate</code> 属性来描述该组合已经选择了部分选项。该属性只是控制样式。</p>
  <p>在 <code>CheckboxGroup</code>中已经集成了全选按钮，只需要添加一个 <code>check-all-box</code> 属性即可</p>
</div>
</demo>
<template>
  <Checkbox :checked="true" >选了</Checkbox>
  <Checkbox indeterminate >没全</Checkbox>
  <p>------------------------------</p>
  <CheckboxGroup check-all-box @checkChange="changeHandle" :options="options" :value="value"></CheckboxGroup>
</template>
<script lang="ts">
import CheckboxGroup from '../../lib/CheckboxGroup.vue';
import Checkbox from '../../lib/Checkbox.vue';
import {ref} from 'vue';

export default {
  components: {
    CheckboxGroup,Checkbox
  },
  setup() {
    const changeHandle = (v) => {
      value.value = v;
    };
    const value = ref(['上厕所','睡觉', '吃饭']);
    // 只是用于展示可以的写法，代码规范自己注意
    const options = [
      {value: '上厕所', label: '上厕所'},
      {value: '打游戏', label: '', disabled: false},
      {value: '洗澡', label: '洗澡', disabled: false},
      {value: '吃饭', label: '吃饭', disabled: true},
      {value: '睡觉', disabled: true},
      {value: '干坏事', disabled: true},
    ];
    return {
      changeHandle,
      value,
      options
    };
  }
};
</script>
