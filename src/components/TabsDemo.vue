<template>
  <div>Tabs 示例</div>
  <Tabs>
    <Tab title="周一">上班</Tab>
    <Tab title="周二">还是上班</Tab>
  </Tabs>
</template>
<script lang="ts">
import Tabs from '../lib/Tabs.vue';
import Tab from '../lib/Tab.vue';

export default {
  components: {
    Tabs,
    Tab,
  }
};
</script>
<style lang="sass">

</style>
