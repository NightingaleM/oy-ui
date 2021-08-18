<demo>
<h2>基础用法</h2>
<div>
  <p><code>titles</code>是一个长度为2的字符串数组，是左右两边列表头部显示的标题。</p>
  <p><code>dataSource</code>是数据源，其中的数据将会被渲染到左边一栏中。类型： <code>[key:string.isRequired,]</code></p>
  <p><code>selectKeys</code>设置哪些项应该被选中</p>
  <p><code>@change</code>是在每次 <code>selectKeys</code>被改变时触发的事件。</p>
</div>
</demo>
<template>
  <p>value: {{ selected }}</p>
  <Transfer :titles="['Source','Target']" :data-source="list" v-model:selected-keys="selected"
            @change="transferHandle"></Transfer>
</template>
<script lang="ts">
import Transfer from '../../lib/Transfer/Transfer.vue';
import {ref} from 'vue';

export default {
  components: {
    Transfer
  },
  setup(props, context) {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14].map(e => {
      // const r = Math.random().toString(36).substr(2, 4);
      return {
        key: String(e),
        label: String(e),
      };
    });
    const selected = ref([]);
    const transferHandle = (data) => {
      console.log(data);
    };
    return {
      list, selected, transferHandle
    };
  }
};
</script>
