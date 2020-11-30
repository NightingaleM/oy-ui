<template>
  <div v-for="(item,index) in defaults" :key="item.props.name">
    <component :activeNames="activeNames" :is="item"></component>
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
