<template>
  <div id="oy-checkbox-group">
    <div v-if="checkAllBox" class="oy-option">
      <Checkbox :indeterminate="checkAllStatus==='indeterminate'"
                :checked="checkAllStatus ==='checkAll'"
                @checkChange="checkAllOrCancel">全选
      </Checkbox>
    </div>
    <Checkbox :block="block" :checked="values.indexOf(item.value) >=0"
              v-for="item in list" :key="item.label"
              :info="item"
              :disabled="item.disabled"
              @checkChange="checkHandle">{{ item.label }}
    </Checkbox>
  </div>
</template>
<script lang="ts">
import {computed, ref, watchEffect} from 'vue';
import Checkbox from './Checkbox.vue';

export default {
  components: {Checkbox},
  props: {
    checkAllBox:{
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
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

      const vl = values.value
      const r_ol = props.options.filter(e=>(!e?.disabled) ?? true).map(e=>e.value)
      if (!vl) {
        return 'empty';
      } else if (new Set([...vl,...r_ol]).size === vl.length) {
        return 'checkAll';
      } else {
        return 'indeterminate';
      }
    });
    const values = ref([...props.value]);
    const checkHandle = (v) => {
      const {status,label} = v
      const index = values.value.indexOf(label);
      if ( status && index < 0) {
        values.value.push(label);
      } else {
        values.value.splice(index, 1);
      }
    };
    watchEffect(() => {
      emit('checkChange', values.value);
    });
    const checkAllOrCancel = (v) => {
      console.log('??');
      console.log(checkAllStatus.value);
      switch (checkAllStatus.value) {
        case 'empty':
          values.value = list.map(e => e.value);
          break;
        case 'checkAll':
          const op = props.options.filter(e=>(!e?.disabled) ?? true).map(e=>e.value)
          values.value = values.value.filter(e=>op.indexOf(e)<0);
          break;
        case 'indeterminate':
          values.value = Array.from(new Set([...values.value,...list.filter(e=>(!e?.disabled) ?? true).map(e => e.value)]));
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


}

</style>
