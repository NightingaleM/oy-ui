<demo>
<h2>基础用法</h2>
</demo>
<template>
  <Transfer :data-source="list" :selected-keys="selected" @change="transferHandle"></Transfer>
</template>
<script lang="ts">
import Transfer from '../../lib/Transfer/Transfer.vue';
import {ref} from 'vue';

export default {
  components: {
    Transfer
  },
  setup(props, context) {
    const list = [1, 2, 3, 4, 5].map(e => {
      const r = Math.random().toString(36).substr(2, 4);
      return {
        key: r,
        label: r
      };
    });
    const selected = ref([])
    const transferHandle = (data) => {
      console.log(data);
      selected.value = data;
    };
    return {
      list, selected, transferHandle
    };
  }
};
</script>
