<demo>
<h2>基本用法</h2>
<p>
  使用 <code>total</code> 和 <code>pageSize</code>
</p>
</demo>
<template>
  <p>页面较少时：</p>
  <!--  <Pagination total="20"></Pagination>-->
  <p>页面超过7页时： 当前页：<span>{{ cp }}</span></p>
  <Pagination :total="1000" :current-page="cp" @changePage="changePageHandle"></Pagination>
  <p>修改<code>pageSize</code>后：</p>
  <!--  <Pagination total="1000" page-size="35"></Pagination>-->
</template>
<script lang="ts">
import Pagination from '../../lib/Pagination.vue';
import {ref} from 'vue';

export default {
  components: {
    Pagination
  },
  setup() {
    const cp = ref(91);
    const changePageHandle = (page) => {
      cp.value = page;
    };
    return {
      cp, changePageHandle
    };
  }
};
</script>
<style lang="sass">

</style>

