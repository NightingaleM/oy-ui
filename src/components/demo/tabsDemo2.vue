<demo>
<h2>调整位置</h2>
<p>使用<code>position</code>属性，调整tab位置。可选属性：<code>centered,left,right</code>。默认属性为<code>left</code>。</p>
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

