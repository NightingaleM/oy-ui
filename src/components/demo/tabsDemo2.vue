<demo>
position
<p>默认情况下为靠左。</p>
</demo>
<template>
  <p>position:centered</p>
  <Tabs v-model:selected="selected" position="centered">
    <Tab title="首页">首页</Tab>
    <Tab title="热点">热点</Tab>
    <Tab title="个人">个人</Tab>
  </Tabs>
  <p>position:left</p>
  <Tabs v-model:selected="selected2" position="left">
    <Tab title="首页">首页</Tab>
    <Tab title="热点">热点</Tab>
    <Tab title="个人">个人</Tab>
  </Tabs>
  <p>position:right</p>
  <Tabs v-model:selected="selected3" position="right">
    <Tab title="首页">首页</Tab>
    <Tab title="热点">热点</Tab>
    <Tab title="个人">个人</Tab>
  </Tabs>
</template>
<script lang="ts">
import Tabs from '../../lib/Tabs.vue';
import Tab from '../../lib/Tab.vue';
import {ref} from 'vue';

export default {
  components: {
    Tabs,
    Tab,
  },
  setup() {
    let selected = ref('首页');
    let selected2 = ref('首页');
    let selected3 = ref('首页');
    return {
      selected,
      selected2,
      selected3,
    };
  }
};
</script>
<style lang="sass">

</style>

