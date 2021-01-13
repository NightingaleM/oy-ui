<demo>
<h2>HideOnOnePage 一页时自动隐藏</h2>
<p>
  设置 <code>hideOnOnePage</code> 属性，当只有一页时，组建会自动隐藏。默认值为 <code>false</code>。
</p>
</demo>
<template>
  <Switch v-model:value="isHide"></Switch>
  <p>hide-on-one-page: {{ isHide }}</p>
  <Pagination
      layout="prev,next"
      :hide-on-one-page="isHide"
      v-model:current-page="page"
      :total="10"
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
    const isHide = ref(false);
    const page = ref(1);

    return {
      isHide,
      page,
    };
  }
};
</script>
<style lang="sass">

</style>

