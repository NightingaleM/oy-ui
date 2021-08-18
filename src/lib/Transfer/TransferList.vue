<template>
  <div class="oy-transfer-list-module" @drop="drop($event)" @dragover="allowDrop($event)">
    <div class="oy-transfer-list-option">
      <p>
        <Checkbox
            v-if="checkAll"
            :indeterminate="checkAllStatus==='indeterminate'"
            :checked="checkAllStatus ==='checkAll'"
            @checkChange="checkAllOrCancel">全选
        </Checkbox>
        <span class="oy-transfer-list-title" v-if="title">{{ title }}</span>
      </p>
      <input v-if="search" placeholder="请输入搜索内容" type="text" v-model="keyword">
    </div>
    <div class="oy-transfer-list">
      <div :class="['oy-item',`oy-item-drag-${R}`,`oy-item-key-${i}`]" v-for="i in filtrateList" :key="i"
           draggable="true"
           @dragstart="drag($event,i)">
        <Checkbox
            @checkChange="checkHandle"
            :checked="values.indexOf(i) >=0"
            :info="{value:i}"
        >{{ i }}
        </Checkbox>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Checkbox from '../Checkbox.vue';
import {computed, ref, watch, watchEffect} from 'vue';

export default {
  components: {
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
    R: {
      type: String,
    },
    title: {
      type: String,
    },
    list: {
      type: Array
    },
    checkList: {
      type: Array
    }
  },
  setup(props, context) {
    const {emit} = context;
    const keyword = ref('');
    const filtrateList = computed(() => {
      if (!keyword.value) return props.list;
      return props.list.filter(e => e.match(keyword.value));
    });

    const values = ref([]);
    const checkAllStatus = computed(() => {
      const l = values.value.length;
      if (!l) {
        return 'empty';
      } else if (l === props.list.length) {
        return 'checkAll';
      } else {
        return 'indeterminate';
      }
    });
    watchEffect(() => {
      emit('update:checkList', values.value);
    });
    watchEffect(() => {
      const l = props.list;
      values.value = values.value.filter(e => l.indexOf(e) >= 0);
    });
    const allowDrop = (ev) => {
      ev.preventDefault();
    };
    const drag = (ev, key) => {
      ev.dataTransfer.setData('Text', `oy-item-${key}`);
      ev.dataTransfer.setData('Module_Key', props.R);
    };
    const drop = (ev) => {
      ev.preventDefault();
      emit('oy-drop', ev);
    };
    const checkAllOrCancel = () => {
      switch (checkAllStatus.value) {
        case 'checkAll':
          values.value = [];
          break;
        default:
          values.value = [...props.list];
          break;
      }
    };
    const checkHandle = v => {
      const {status, label} = v;
      const index = values.value.indexOf(label);
      if (status && index < 0) {
        values.value.push(label);
      } else {
        values.value.splice(index, 1);
      }
    };
    return {
      checkHandle,
      checkAllOrCancel,
      checkAllStatus,
      values,
      keyword,
      filtrateList,
      allowDrop,
      drag,
      drop,
    };
  }
};
</script>
<style lang="scss">
.oy-transfer-list-module {
  border: 1px solid #ccc;
  border-radius: 5px;
  min-width: 180px;
  max-width: 360px;
  height: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .oy-transfer-list-option {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;

    p {
      padding-right: 13px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .oy-transfer-list-title {
        padding-left: 14px;
        font-size: 16px;
        color: #999
      }
    }

    input {
      border: 1px solid #ccc;
      border-radius: 2px;
      box-shadow: none;
      outline: none;
      display: inline-block;
      margin: 0 10px;
      padding: 3px;

      $color-placeholder: #eee;

      &::-webkit-input-placeholder {
        color: $color-placeholder;
      }

      &:-moz-placeholder {
        color: $color-placeholder;
      }

      &::-moz-placeholder {
        color: $color-placeholder;
      }

      &:-ms-input-placeholder {
        color: $color-placeholder;
      }
    }
  }

  .oy-transfer-list {
    //height: 100%;
    overflow: auto;

    .oy-item-drag {


      &:active {
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12) !important


      }

    }
  }
}
</style>
