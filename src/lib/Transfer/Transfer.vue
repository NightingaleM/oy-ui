<template>
  <div :class="['oy-transfer',`oy-transfer-${R}`]">
    <div class="oy-transfer-box oy-left" :style="listStyle">
      <TransferList
          :checkAll='checkAll'
          :search='search'
          :R='R'
          :title="titles[0]??null"
          :list="leftList"
          @oy-drop="drop"
          v-model:checkList="leftCheckList"
      ></TransferList>
    </div>
    <div class="oy-transfer-option">
      <Button theme="primary" size="mini" @click="migration('toRight')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-you"></use>
        </svg>
      </Button>
      <Button theme="primary" size="mini" @click="migration('toLeft')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zuo"></use>
        </svg>
      </Button>
    </div>
    <div class="oy-transfer-box oy-right" :style="listStyle">
      <TransferList
          :checkAll='checkAll'
          :search='search'
          :R='R'
          :title="titles[1]??null"
          :list="rightList"
          @oy-drop="drop"
          v-model:checkList="rightCheckList"
      ></TransferList>
    </div>
  </div>
</template>
<script lang="ts">
import {computed, ref, watch, watchEffect} from 'vue';
import Checkbox from '../Checkbox.vue';
import TransferList from './TransferList.vue';
import Button from '../Button.vue';

export default {
  components: {
    Button,
    TransferList,
    Checkbox
  },
  props: {
    checkAll: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    listStyle: {
      type: Object,
      default: {
        height: '300px',
        width: '200px'
      }
    },
    titles: {
      type: Array
    },
    dataSource: {
      type: Array,
      require: true
    },
    selectedKeys: {
      type: Array,
      require: true
    },
    dragDrop: {
      type: Boolean,
      default: false
    },
  },
  emits: ['update:selectedKeys', 'change'],
  setup(props, {emit}) {
    const R = Math.random().toString(36).substr(2, 4);
    const leftList = ref(props.dataSource.map(e => e.key));
    const rightList = ref([...props.selectedKeys]);
    const leftCheckList = ref([]);
    const rightCheckList = ref([]);
    watchEffect(() => {
      emit('update:selectedKeys', rightList.value);
    });
    watch(rightList.value, () => {
      emit('change', rightList.value);
    });
    const drop = (ev) => {
      ev.preventDefault();
      const _R = ev.dataTransfer.getData('Module_Key');
      if (!findParent(ev.target, `oy-transfer-${_R}`)) return;
      const data = ev.dataTransfer.getData('Text');
      const key = data.replace('oy-item-', '');
      const direction = !!findParent(ev.target.parentElement, 'oy-left') ? 'left' : 'right';
      const leftIndex = leftList.value.indexOf(key);
      const rightIndex = rightList.value.indexOf(key);
      // 如果放置目标是item，则认定为需要调整顺序
      const orderItem = findParent(ev.target, 'oy-item');
      const targetKey = !!orderItem ? [...orderItem.classList].find(e => !!e.match(/oy\-item\-key\-./g)).replace('oy-item-key-', '') : null;
      const targetIndex = !!orderItem ? direction === 'left' ? leftList.value.indexOf(targetKey) : rightList.value.indexOf(targetKey) : null;
      switch (direction) {
        case 'left':
          if (leftIndex < 0 && rightIndex >= 0) {
            rightList.value.splice(rightIndex, 1);
          } else {
            leftList.value.splice(leftIndex, 1);
          }
          leftList.value.splice(targetIndex ?? leftList.value.length, 0, key);
          break;
        case 'right':
          if (rightIndex < 0 && leftIndex >= 0) {
            leftList.value.splice(leftIndex, 1);
          } else {
            rightList.value.splice(rightIndex, 1);
          }
          rightList.value.splice(targetIndex ?? rightList.value.length, 0, key);
          break;
      }
    };

    const findParent = (document, target) => {
      if (!document.parentElement) return null;
      if (document.className?.match(target)) {
        return document;
      } else {
        return findParent(document.parentElement, target);
      }
    };

    const migration = direction => {
      if (direction === 'toLeft') {
        leftList.value.push(...rightCheckList.value);
        rightList.value = rightList.value.filter(e => rightCheckList.value.indexOf(e) < 0);
        rightCheckList.value = [];
      } else {
        rightList.value.push(...leftCheckList.value);
        leftList.value = leftList.value.filter(e => leftCheckList.value.indexOf(e) < 0);
        leftCheckList.value = [];
      }
    };
    return {
      R,
      migration,
      leftList, rightList, drop,
      leftCheckList,
      rightCheckList
    };
  }
};


</script>
<style lang="scss">
.oy-transfer {
  display: flex;
  user-select: none;

  .oy-transfer-box {
  }

  .oy-transfer-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
