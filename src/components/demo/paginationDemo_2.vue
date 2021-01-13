<demo>
<h2>Layout 布局</h2>
<p>
  使用 <code>layout</code> 可以设定是否有上\下一页按钮。

  同时，当有上\下按钮后，可以使用 <code>@prevClick</code> 和 <code>@nextClick</code> 来监听按钮是否被使用
</p>
</demo>
<template>
  <p>当前页：<span>{{ page3 }}</span> /
    当前操作： <span>{{ pagination3Action }}</span>
  </p>
  <Pagination
      layout="prev,next"
      @prevClick="prevChange"
      @nextClick="nextChange"
      v-model:current-page="page3"
      :total="350" :page-size="35"
  ></Pagination>
</template>
<script lang="ts">
import Pagination from '../../lib/Pagination.vue';
import {ref} from 'vue';

export default {
  components: {
    Pagination
  },
  setup() {
    const page3 = ref(1);
    const pagination3Action = ref('无');
    const prevChange = page => {
      // page3.value = page;
      pagination3Action.value = '上一页';
    };
    const nextChange = page => {
      pagination3Action.value = '下一页';
    };
    return {
      page3,
      pagination3Action,
      prevChange,
      nextChange
    };
  }
};
</script>
<style lang="sass">

</style>

