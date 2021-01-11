<template>
  <ul>
    <li
        class="oy-treeview-node"
        v-for="(node,index) in items"
        @click.stop="showUpHandle(node.id)">
      {{ node.name }}
      <div class="oy-children-box" v-if="node.children && showMap[node[primaryKey]]">
        <component is="TreeView" :items="node.children" @changeShowUp="showUpHandle"></component>
      </div>
    </li>
  </ul>

</template>
<script lang="ts">
import TreeView from './Treeview.vue';
import {nextTick, onMounted, ref, computed, watchEffect} from 'vue';

const treeHandle = (item, primaryKey, defaultExpandedKeys) => {
  console.log('run');
  let showMap = {};
  // let selectMap = {};
  const handle = (root) => {
    if (showMap[root[primaryKey]]) return;
    showMap[root[primaryKey]] = !(defaultExpandedKeys.indexOf(root[primaryKey]) < 0);
    if (root.children) {
      root.children.forEach(it => {
        handle(it);
      });
    }
  };
  item.forEach(it => {
    handle(it);
  });
  console.log(showMap);
  return showMap;
};

export default {
  name: 'TreeView',
  props: {
    items: {
      type: Array,
      require: true
    },
    primaryKey: {
      type: String,
      default: 'id'
    },
    defaultExpandedKeys: {
      type: Array,
      default: []
    }
  },
  // components: {TreeView},
  setup(props, context) {
    const {items, primaryKey, defaultExpandedKeys} = props;
    const {emit} = context;
    const showMap = ref({});
    const showUpHandle = (id) => {
      showMap.value[id] = !showMap.value[id];
      emit('changeShowUp', id);
    };

    watchEffect(() => {
      showMap.value = treeHandle(items, primaryKey, defaultExpandedKeys);
    });

    return {
      showUpHandle,
      TreeView,
      showMap
    };
  }
};
</script>
<style lang="scss">
.oy-treeview-node {
  margin-left: 15px;
  padding-left: 5px;

  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
</style>


