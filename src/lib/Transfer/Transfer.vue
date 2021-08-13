<template>
  <div class="oy-transfer">
    <div class="oy-transfer-box oy-left">
      <div class="oy-transfer-box-header"></div>
      <div class="oy-list" @drop="drop($event)" @dragover="allowDrop($event)">
        <input type="text" v-model="leftKeyword">
        <div :class="['oy-item','oy-item-drag',`oy-item-${i}`]" v-for="i in filtrateLeftList" :key="i" draggable="true"
             @dragstart="drag($event,i)">
          拖动试试-{{ i }}
        </div>
      </div>
    </div>
    <div class="oy-transfer-box oy-right">
      <div class="oy-transfer-box-header"></div>
      <div class="oy-list" @drop="drop($event)" @dragover="allowDrop($event)">
        <input type="text" v-model="rightKeyword">
        <div :class="['oy-item',`oy-item-${i}`]" v-for="i in filtrateRightList" :key="i" draggable="true"
             @dragstart="drag($event,i)">
          拖动试试-{{ i }}
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {computed, ref, watchEffect} from 'vue';

export default {
  props: {
    dataSource: Array,
    selectedKeys: Array,
    dragDrop: {
      type: Boolean,
      default: false
    },
  },
  setup(props, {emit}) {
    const leftList = ref(props.dataSource.map(e => e.key));
    const rightList = ref([...props.selectedKeys]);
    const leftKeyword = ref('');
    const rightKeyword = ref('');
    const filtrateLeftList = computed(() => {
      if (!leftKeyword.value) return leftList.value;
      return leftList.value.filter(e => e.match(leftKeyword.value));
    });
    const filtrateRightList = computed(() => {
      if (!rightKeyword.value) return rightList.value;
      return rightList.value.filter(e => e.match(rightKeyword.value));
    });
    watchEffect(() => {
      emit('change', rightList.value);
    });

    const allowDrop = (ev) => {
      ev.preventDefault();
    };

    const drag = (ev, key) => {
      ev.dataTransfer.setData('Text', `oy-item-${key}`);
    };

    const drop = (ev) => {
      ev.preventDefault();
      const data = ev.dataTransfer.getData('Text');
      const key = data.replace('oy-item-', '');
      const direction = !!findParent(ev.target.parentElement, 'oy-left') ? 'left' : 'right';
      const leftIndex = leftList.value.indexOf(key);
      const rightIndex = rightList.value.indexOf(key);
      // 如果放置目标是item，则认定为需要调整顺序
      const orderItem = findParent(ev.target, 'oy-item');
      const targetKey = !!orderItem ? [...orderItem.classList].find(e => !!e.match(/oy\-item\-./g)).replace('oy-item-', '') : null;
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

    return {
      leftKeyword, leftList,
      rightKeyword, rightList,
      filtrateLeftList, filtrateRightList,
      allowDrop, drag, drop
    };
  }
};


</script>
<style lang="scss">
.oy-transfer {
  display: flex;

  .oy-transfer-box {
    flex: 1;

    .oy-list {
      border: 1px solid #ccc;
      padding-left: 5px;
      padding-right: 5px;
      padding-bottom: 30px;

      .oy-item {
        margin: 5px;
        border: 1px dashed #ccc;

        //&:hover {
        //  background-color: rgba(212, 134, 54, 0.4);
        //  border-bottom: 2px solid rgba(212, 134, 54, 0.9);
        //}
      }
    }
  }

  .oy-left {

  }

  .oy-right {

  }
}
</style>
