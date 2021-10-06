<template>
  <div class="oy-collapse-panel">
    <component v-for="(item,index) in defaults"
               :key="item.props.name"
               :activeNames="activeNames"
               :is="item"></component>
  </div>
</template>
<script lang="ts">
import {ref, onMounted, watchEffect, reactive} from 'vue';
import CollapseItem from './Collapse-Item.vue';

export default {
  props: {
    activeNames: {
      type: Array,
      require: true
    }
  },
  setup(props, context) {
    const defaults = context.slots.default();
    defaults.forEach(item => {
      // @ts-ignore
      if (item.type.name !== CollapseItem.name) {
        throw new Error('Collapse的子标签必须为CollapseItem');
      }
    });
    return {
      defaults
    };
  }
};
</script>
<style lang="scss">
.oy-collapse-panel {
  border-radius: 4px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
}
</style>
