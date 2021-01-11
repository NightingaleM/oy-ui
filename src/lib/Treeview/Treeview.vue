<template>
  <ul class="oy-treeview-root">
    <li
        :class="['oy-treeview-node',{'oy-treeview-click':node.children}]"
        v-for="(node,index) in items"
        @click.stop="showUpHandle(node.id)">
      <div class="oy-treeview-text">
        <svg class="icon" aria-hidden="true" v-show="node.children && showMap[node[primaryKey]]">
          <use xlink:href="#icon-zhankai"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-show="node.children && !showMap[node[primaryKey]]">
          <use xlink:href="#icon-zhankai2"></use>
        </svg>
        {{ node.name }}
      </div>
      <div class="oy-children-box" v-if="node.children && showMap[node[primaryKey]]">
        <component is="TreeView" :items="node.children" @changeShowUp="showUpHandle"></component>
      </div>
    </li>
  </ul>

</template>
<script lang="ts">
import TreeView from './Treeview.vue';
import {ref, watchEffect} from 'vue';

const treeHandle = (item, primaryKey, defaultExpandedKeys) => {
  let showMap = {};
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
.oy-treeview-root {

  .oy-treeview-node {
    border-left: 1px solid #ccc;
    padding-left: 15px;
    cursor: default;

    .oy-treeview-text {
      position: relative;
      padding: 10px 10px 10px 25px;

      svg {
        position: absolute;
        top: 50%;
        left: -5px;
        transform: translateY(-50%);
      }
    }
  }

  .oy-treeview-click {
    cursor: pointer;
    >.oy-treeview-text{
      &:hover{
        text-decoration: underline;
      }
    }
  }
}

</style>


