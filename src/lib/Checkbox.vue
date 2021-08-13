<template>
  <label :class="['oy-checkbox-wrapper',{'oy-checkbox-selected': checked}]">
      <span class="oy-checkbox-input">
        <input type="checkbox" :value="info.value" @change="checkHandle(info.value)">
        <span class="oy-checkbox-input-inner">
          <svg class="icon" aria-hidden="true" v-show="checked">
            <use xlink:href="#icon-zhengque"></use>
          </svg>
        </span>
      </span>
    <span>
      <slot>{{ info.label }}</slot>
    </span>
  </label>
</template>
<script lang="ts">
import {defineComponent, ref, watchEffect} from 'vue';

interface checkboxInfoInterface {
  label?: string,
  value: string
}

export default defineComponent({
  props: {
    indeterminate: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object as () => checkboxInfoInterface,
      default: () => {
        return {
          __defaultProps: true,
          value: true
        };
      }
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const status = ref(props.checked);
    const {emit} = context;
    const checkHandle = (v) => {
      status.value = !status.value;
      if (props.info?.__defaultProps) {
        emit('checkChange', status.value);
      } else {
        emit('checkChange', v);
      }
    };
    return {
      checkHandle
    };
  }
});
</script>
<style lang="less">
.oy-checkbox-wrapper {
  display: flex;
  align-items: center;

  &:hover {
    .oy-checkbox-input-inner {
      border: 1px solid #00bcd4;
    }
  }

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
      transition: border 0.3s;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0;
      position: absolute;
      width: 18px;
      height: 18px;
      border: 1px solid #ccc;
      border-radius: 2px;

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
