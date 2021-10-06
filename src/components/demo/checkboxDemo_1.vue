<demo>
<h2>基本使用</h2>
<div>
  <p>受控的checkbox。</p>
  <p>通过 <code>block</code> 来控制是行内元素还是块级元素</p>
</div>
</demo>
<template>
  <Button theme="primary" @click="isChecked=!isChecked">{{ isChecked ? '不' : '' }}选择</Button>
  <Checkbox block :checked="isChecked" @checkChange="checkboxHandel">苹果</Checkbox>
  <p>
    <Checkbox :checked="isChecked" @checkChange="checkboxHandel">苹果</Checkbox>
    <Checkbox :checked="isChecked" @checkChange="checkboxHandel">苹果</Checkbox>
  </p>

</template>
<script lang="ts">
import Checkbox from '../../lib/Checkbox/Checkbox.vue';
import Button from '../../lib/Button.vue';
import {defineComponent, ref} from 'vue';

export default defineComponent({
  components: {
    Checkbox, Button
  },
  setup() {
    const isChecked = ref(false);
    const checkboxHandel = v => {
      const {status, label} = v;
      isChecked.value = status;
    };
    return {
      isChecked,
      checkboxHandel
    };
  }
});
</script>
