<demo>
<h2>基本使用</h2>
</demo>
<template>
  {{ isChecked ? '^3^' : 'QAQ' }}
  <Checkbox :checked="isChecked" @checkChange="checkboxHandel">选择吗？</Checkbox>
</template>
<script lang="ts">
import Checkbox from '../../lib/Checkbox.vue';
import {defineComponent, ref} from 'vue';

export default defineComponent({
  components: {
    Checkbox
  },
  setup() {
    const isChecked = ref(false);
    const checkboxHandel = v => {
      isChecked.value = v;
    };
    return {
      isChecked,
      checkboxHandel
    };
  }
});
</script>
