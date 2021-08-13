<template>
  <div id="oy-checkbox-group">
    {{ values }}
    <div class="oy-option"></div>
    <Checkbox :checked="values.indexOf(item.value) >=0"
              v-for="item in list" :key="item.label"
              :info="item"
              @checkChange="checkHandle">
      <span>{{ item.label }}</span>
    </Checkbox>
  </div>
</template>
<script lang="ts">
import {ref, watchEffect} from 'vue';
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
    return {
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

  .oy-checkbox-selected {
    .oy-checkbox-input {
      .oy-checkbox-input-inner {
        background-color: #00bcd4;
        border: 1px solid #00bcd4;

        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: inline-block;
          width: 75%;
          height: 75%;
          background-color: #00bcd4;
          color: #fff;
          animation: oy-icon-wave-show 0.3s forwards ease-out;
        }

        &:after {
          content: '';
          border: 1px solid #00bcd4;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 2px;
          animation: oy-border-wave-show 0.3s forwards ease-in;
        }
      }
    }
  }
}

@keyframes oy-icon-wave-show {
  0% {
    width: 10%;
  }
  75% {
    width: 130%;
  }
  100% {
    width: 75%;
  }
}

@keyframes oy-border-wave-show {
  0% {
    width: 100%;
    height: 100%;
    opacity: 1;
    border: 1px solid #00bcd4;
  }
  100% {
    border: 2px solid #00bcd4;
    width: 130%;
    height: 130%;
    opacity: 0;
  }
}

</style>
