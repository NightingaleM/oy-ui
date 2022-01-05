<template>
  <div :class="['oy-virtual-list']"
       ref="listRefs"
       @scroll="scrollHandle"
       :style="{
      height: height
    }"
  >
    <ul :class="['oy-virtual-list-ul']"
        :style="{
      height: fullHeight+'px'
    }">
      <li v-for="(item,index) in showing"
          :class="['oy-virtual-list-li']"
          :style="{
        height: item.height + 'px',
        top: item.top + 'px',
        width: '100%'
      }"
      >
        <template v-if="child">
          <component :is="child"
                     :key="index"
                     v-bind:infos="item"
          ></component>
        </template>
        <p
            :class="['oy-virtual-list-li-p']"
            v-else>
          {{ item.content }}
        </p>
      </li>
    </ul>
    <slot name="lastOne"></slot>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch, watchEffect} from 'vue';

/**
 *  简单测试发现 li 上不加 key 在 21000条的情况下 比加 key 表现略好，所以就先不加了
 */

export default defineComponent({
  name: 'VirtualList',
  props: {
    list: {
      // 渲染的列表
      type: Array,
      require: true
    },
    width: {
      // 组件宽度
      // type: Number || String,
      default: '100%'
    },
    height: {
      // 整个组件的高度
      // type: Number || String,
      default: '300px'
    },
    itemHeight: {
      // 默认的每条数据的高度
      type: Number,
      default: 50
    },
    soleBalance: {
      // 触底回调时用于缓冲的，如 默认40 则距离底部还有40px时，就出发回调
      type: Number,
      default: 40
    },
    child: {
      // 一个可以props可以接受 infos:{} 的组件
      default: null
    },
  },
  setup(props, context) {
    const {emit} = context;
    const entry = ref([]);
    const fullHeight = ref(0);
    const listRefs = ref(null);
    const scrollTop = ref(0);
    const entryHandle = () => {
      let h = 0;
      const data = props.list.map(e => {
        let hold = {...e};
        if (!hold.height) hold.height = props.itemHeight;
        hold.top = h;
        h += hold.height;
        return hold;
      });
      fullHeight.value = h;
      entry.value = data;
    };
    watch(props.list, (a, b) => {
      entryHandle();
    });
    entryHandle();
    const scrollHandle = event => {
      scrollTop.value = event.target?.scrollTop ?? 0;
      if (scrollTop.value + parseInt(props.height) + +props.soleBalance > fullHeight.value) {
        emit('scrollSole', event);
      }
    };

    const showing = computed(() => {
      const viewHeight = parseInt(props.height);
      const top = scrollTop.value;
      const bottom = scrollTop.value + viewHeight;
      const start = entry.value.findIndex(e => (top - 30) < (e.top + e.height));
      let end = entry.value.findIndex(e => (bottom + 50) < e.top);
      end = end === -1 ? entry.value.length : end + 1;
      return entry.value.slice(start, end);
    });
    return {
      listRefs,
      entry,
      fullHeight,
      scrollHandle,
      showing
    };
  },
});
</script>
<style lang="scss">
.oy-virtual-list {
  overflow-y: auto;

  .oy-virtual-list-ul {
    position: relative;

    .oy-virtual-list-li {
      position: absolute;

      .oy-virtual-list-li-p {
        border-bottom: 1px solid #ccc;
        height: 100%;
      }
    }
  }
}
</style>
