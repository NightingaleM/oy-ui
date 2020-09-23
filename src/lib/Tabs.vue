<template>

</template>
<script lang="ts">
import Tab from './Tab.vue';
import {ref} from 'vue'
export default {
  setup(props, context) {
    let defaults = context.slots.default();
    defaults.forEach(tab => {
      if (tab.type !== Tab) {
        throw new Error('Tabs的子标签必须为Tab');
      }
    });
  }
};
</script>
<style lang="sass">

</style>
