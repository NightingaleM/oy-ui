<demo>
<h2>HideOnOnePage 仅一页时自动隐藏</h2>
<p>
  设置 <code>hideOnOnePage</code> 属性，当只有一页时，组建会自动隐藏。默认值为 <code>false</code>。
</p>
</demo>
<template>
<!--  <input v-model="total" type="number" min="1"/>-->
  <Switch v-model:value="isHide"></Switch>
  <p><code>hide-on-one-page: {{ isHide }}</code></p>
  <Pagination
      layout="prev,next"
      :hide-on-one-page="isHide"
      v-model:current-page="page"
      :total="total"
  ></Pagination>
</template>
<script lang="ts">
import Pagination from '../../lib/Pagination.vue';
import {ref} from 'vue';
import Switch from '../../lib/Switch.vue';

export default {
  components: {
    Pagination,
    Switch
  },
  setup() {
    const total = ref(10);
    const isHide = ref(false);
    const page = ref(1);

    return {
      isHide,
      page,
      total
    };
  }
};
</script>
<style lang="sass">

</style>

