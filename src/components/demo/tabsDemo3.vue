<demo>
<h2>填充</h2>
<p>使用 <code>grow</code>属性，可以将未占用的空间填满。</p>
</demo>
<template>
  <div>Tabs 示例</div>
  <Tabs grow v-model:selected="selected" position="centered">
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
    return {
      selected
    };
  }
};
</script>
<style lang="sass">

</style>

