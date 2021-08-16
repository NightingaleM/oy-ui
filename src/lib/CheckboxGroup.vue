<template>
  <div id="oy-checkbox-group">
    <div class="oy-option">
      <Checkbox :indeterminate="checkAllStatus==='indeterminate'"
                :checked="checkAllStatus ==='checkAll'"
                @change="checkAllOrCancel">
        <span>全选</span>
      </Checkbox>
    </div>
    <Checkbox :checked="values.indexOf(item.value) >=0"
              v-for="item in list" :key="item.label"
              :info="item"
              @checkChange="checkHandle">
      <span>{{ item.label }}</span>
    </Checkbox>
  </div>
</template>
<script lang="ts">
import {computed, ref, watchEffect} from 'vue';
import Checkbox from './Checkbox.vue';

export default {
  components: {Checkbox},
  props: {
    options: {
      type: Array,
      validator: function (value: []) {
        return value.every((v) => {
          if (typeof v === 'string') return true;
          if (typeof v === 'object') {
            return v.hasOwnProperty('value');
          }
        });
      }
    },
    value: {
      type: Array as () => string[],
      default: []
    }
  },
  setup(props, context) {
    const {emit} = context;
    const initList = list => {
      if (list.every(v => typeof v === 'string')) {
        return list.map(e => {
          return {value: e, label: e};
        });
      } else {
        return list.map(e => {
          return Object.assign({}, e, {label: e.value});
        });
      }
    };
    const list = initList(props.options);
    const checkAllStatus = computed(() => {
      const l = values.value.length;
      if (!l) {
        return 'empty';
      } else if (l === props.options.length) {
        return 'checkAll';
      } else {
        return 'indeterminate';
      }
    });
    const values = ref([...props.value]);
    const checkHandle = (v) => {
      const index = values.value.indexOf(v);
      if (index < 0) {
        values.value.push(v);
      } else {
        values.value.splice(index, 1);
      }
    };
    watchEffect(() => {
      emit('checkChange', values.value);
    });
    const checkAllOrCancel = (v) => {
      switch (checkAllStatus.value) {
        case 'empty':
          console.log('empty');
          values.value = list.map(e => e.value);
          break;
        case 'checkAll':
          console.log('checkAll');
          values.value = [];
          break;
        case 'indeterminate':
          console.log('indeterminate');
          values.value = list.map(e => e.value);
          break;
      }
    };
    return {
      checkAllStatus,
      checkAllOrCancel,
      list,
      values, checkHandle
    };
  }
};
</script>
<style lang="less">
#oy-checkbox-group {

  .oy-checkbox-wrapper {
    display: flex;
    align-items: center;

    span {
      padding: 0px 15px;
    }

    .oy-checkbox-input {
      position: relative;
      width: 0;
      height: 0;
      margin: 0;
      padding: 0;

      input {
        width: 100%;
        height: 100%;
        border: none;
      }

      .oy-checkbox-input-inner {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 0;
        position: absolute;
        width: 18px;
        height: 18px;
        border: 1px solid #ccc;
        border-radius: 2px;
        //overflow: hidden;

      }
    }

  }

}

</style>
