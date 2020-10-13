<demo>
基本用法
</demo>
<template>
  <div>Tabs 示例</div>
  <Tabs v-model:selected="selected">
    <Tab title="周日(假期）">周日,休息</Tab>
    <Tab title="周一">周一,上班</Tab>
    <Tab title="周二">周二,还是上班</Tab>
    <Tab title="周三">周三,继续上班</Tab>
    <Tab title="周四">周四,上班</Tab>
    <Tab title="周五">周五,
      <Button>准备放假</Button>
    </Tab>
    <Tab title="周六(假期）">周六,休息</Tab>
  </Tabs>
</template>
<script lang="ts">
import Tabs from '../../lib/Tabs.vue';
import Button from '../../lib/Button.vue';
import Tab from '../../lib/Tab.vue';
import {ref} from 'vue';

export default {
  components: {
    Tabs,
    Tab,
    Button,
  },
  setup() {
    let selected = ref('周一');
    return {
      selected
    };
  }
};
</script>
<style lang="sass">

</style>

