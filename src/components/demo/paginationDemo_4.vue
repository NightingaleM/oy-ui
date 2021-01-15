<demo>
<h2>小型分页</h2>
<p>
  设置 <code>small</code> 属性，可以使用小型组建。默认值为 <code>false</code>。
</p>
</demo>
<template>
  <div>
    <code>small: false</code>
    <Pagination
        layout="prev,next"
        v-model:current-page="page"
        :total="50"
    ></Pagination>
  </div>
  <div>
    <code>small: true</code>
    <Pagination
        layout="prev,next"
        v-model:current-page="page"
        small
        :total="50"
    ></Pagination>
  </div>
</template>
<script lang="ts">
import Pagination from '../../lib/Pagination.vue';
import {ref} from 'vue';

export default {
  components: {
    Pagination,
  },
  setup() {
    const page = ref(1);
    return {
      page,
    };
  }
};
</script>
<style lang="sass">

</style>

