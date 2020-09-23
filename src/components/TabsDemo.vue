<template>
  <div>Tabs 示例</div>
  <Tabs v-model:selected="selected">
    <Tab title="周一">上班</Tab>
    <Tab title="周二二二二">还是上班</Tab>
  </Tabs>
</template>
<script lang="ts">
import Tabs from '../lib/Tabs.vue';
import Tab from '../lib/Tab.vue';
import {ref}  from 'vue'
export default {
  components: {
    Tabs,
    Tab,
  },
  setup(){
    let selected = ref('周一')
    return{
      selected
    }
  }
};
</script>
<style lang="sass">

</style>

