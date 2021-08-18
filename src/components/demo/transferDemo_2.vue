<demo>
<h2>高级用法</h2>
<div>
  <p><code>listStyle</code>可以调整列表的宽高。类型：<code>{width: string,height:string}</code></p>
  <p><code>checkAll</code>是否显示全选按钮。</p>
  <p><code>search</code>是否显示搜索框。</p>
</div>
</demo>
<template>
  <Transfer
      :check-all="true"
      :search="true"
      :listStyle="{width: '280px',height:'390px'}"
      :titles="['这里','哪里']" :data-source="list" v-model:selected-keys="selected" @change="transferHandle"></Transfer>
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
        key: 'content' + e,
        label: 'content' + e,
      };
    });
    const selected = ref([]);
    const transferHandle = (data) => {
      console.log('----------');
      console.log(data);
    };
    return {
      list, selected, transferHandle
    };
  }
};
</script>
