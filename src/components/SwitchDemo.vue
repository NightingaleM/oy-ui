<template>
  <div>
    <Switch v-model:value="value1"/>
    <Switch :value="value2" @update:value="value2 = $event"/>

  </div>
</template>
<script lang="ts">
  import Switch from '../lib/Switch.vue';
  import {ref} from 'vue';

  export default {
    components: {Switch},
    setup() {
      const value1 = ref(true);
      const value2 = ref(true);
      return {
        value1,
        value2
      };
    }
  };
</script>
