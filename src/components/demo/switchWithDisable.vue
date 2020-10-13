<demo>
<h2>支持disabled</h2>
</demo>
<template>
  <div>
    <Switch v-model:value="value1" disabled/>
    <br />
    <Switch v-model:value="value2" disabled/>
  </div>
</template>
<script lang="ts">
import Switch from '../../lib/Switch.vue';
import {ref} from 'vue';

export default {
  components: {Switch},
  setup() {
    const value1 = ref(false);
    const value2 = ref(true);
    return {
      value1,
      value2,
    };
  }
};
</script>
