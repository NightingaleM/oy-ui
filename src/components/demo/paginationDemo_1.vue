<demo>
<h2>基本用法</h2>
<div>
  <p>可以使用 <code>v-model:current-page</code> 来做简单实现当前页的绑定。</p>
  <p>也可以用传统写法 <code>:current-page</code> 来传递当前页的值，
    但是此时你需要监听 <code>@changePage</code> 事件来手动修改你的当前页的值。
  </p>
</div>
</demo>
<template>
  <div class=''>
    <p>页面较少时：当前页：<span>{{ page1 }}</span></p>
    <Pagination
        :total="50"
        v-model:current-page="page1"
    ></Pagination>
    <p>页面超过7页时： 当前页：<span>{{ page2 }}</span></p>
    <Pagination
        :total="1000"
        @changePage="changePageHandle"
        :current-page="page2"
    ></Pagination>
    <p>也可以自己设定 <code>page-count</code>，来规定页面按钮数量，取值范围是[5,13]内的奇数。 </p>
    <p>当前 <code>page-count</code>：<span>9</span></p>
    <Pagination
        :total="1000"
        :page-count="9"
        v-model:current-page="page3"
    ></Pagination>
    <p>使用 <code>disable</code></p>
    <Pagination
        disable
        :total="70"
        :current-page="1"
    ></Pagination>
  </div>
</template>
<script lang="ts">
import Pagination from '../../lib/Pagination.vue';
import {ref} from 'vue';

export default {
  components: {
    Pagination
  },
  setup() {
    const page1 = ref(1);
    const page2 = ref(15);
    const page3 = ref(1);
    const changePageHandle = (page) => {
      page2.value = page;
    };
    return {
      page1, page2, page3,
      changePageHandle,
    };
  }
};
</script>
<style lang="sass">

</style>

