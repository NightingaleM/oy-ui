<demo>
<h2>基本使用</h2>
</demo>
<template>
  <CheckboxGroup @checkChange="changeHandle" :options="options" :value="value"></CheckboxGroup>
</template>
<script lang="ts">
import CheckboxGroup from '../../lib/CheckboxGroup.vue';
import {ref} from 'vue';

export default {
  components: {
    CheckboxGroup
  },
  setup() {
    const changeHandle = (v) => {
      console.log(v);
      value.value = v;
    };
    const value = ref(['我']);
    const options = ['你', '我', '他'];
    return {
      changeHandle,
      value,
      options
    };
  }
};
</script>
