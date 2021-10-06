<template>
  <div :class="['oy-checkbox-box',{'oy-checkbox-block-box':block}]">
    <label
        :class="['oy-checkbox-wrapper',{'oy-checkbox-selected': checked},{'oy-checkbox-indeterminate': indeterminate},{'oy-checkbox-disabled': disabled}]">
      <span class="oy-checkbox-input">
        <input :disabled="disabled" type="checkbox" :value="info.value" @change.stop="checkHandle(info.value)">
        <span class="oy-checkbox-input-inner">
          <svg class="icon" aria-hidden="true" v-show="checked">
            <use xlink:href="#icon-zhengque"></use>
          </svg>
        </span>
      </span>

      <span class="oy-checkbox-slot-span"><slot>{{ info.label }}</slot></span>
    </label>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref, watchEffect} from 'vue';

interface checkboxInfoInterface {
  label?: string,
  value: string
}

export default defineComponent({
  props: {
    block: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
    indeterminate: {
      type: Boolean,
      default: false,
      require: false,
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
    watchEffect(() => {
      status.value = props.checked;
    });
    const {emit} = context;
    const checkHandle = (v) => {
      if (props.disabled) return;
      status.value = !status.value;
      if (props.info?.__defaultProps) {
        emit('checkChange', {
          status: status.value,
          label: context.slots.default()[0].children.trim()
        });
        // emit('change', status.value);
      } else {
        emit('checkChange', {
          status: status.value,
          label: v
        });
        // emit('change', v);
      }
    };
    return {
      checkHandle
    };
  }
});
</script>
<style lang="scss">
.oy-checkbox-box {
  display: inline-block;

  .oy-checkbox-wrapper {
    cursor: pointer;
    padding: 4px 0px 4px 16px;
    margin: 2px 5px;
    display: flex;
    align-items: center;

    &:hover {
      .oy-checkbox-input-inner {
        border: 1px solid #00bcd4;
      }
    }

    .oy-checkbox-slot-span {
      padding: 0px 5px 0px 15px;

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
}

.oy-checkbox-block-box {
  display: block;
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

.oy-checkbox-indeterminate {
  .oy-checkbox-input {
    .oy-checkbox-input-inner {
      border: 1px solid #00bcd4;

      &:before {
        background-color: #00bcd4;
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60%;
        height: 60%;
        border-radius: 2px;
        animation: oy-background-wave-show-half 0.3s forwards ease-in;
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
        animation: oy-border-wave-show-2 0.3s forwards ease;
      }
    }
  }
}

.oy-checkbox-wrapper.oy-checkbox-disabled {
  cursor: not-allowed;
  color: #c0c4cc;
}


.oy-checkbox-disabled.oy-checkbox-selected {
  .oy-checkbox-input-inner {
    background-color: #ccc;

    svg {
      background-color: #ccc;
    }
  }
}

.oy-checkbox-disabled {
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

@keyframes oy-border-wave-show-2 {
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

@keyframes oy-background-wave-show-half {
  0% {
    width: 10%;
    height: 10%;
  }
  75% {
    width: 90%;
    height: 90%;
  }
  100% {
    width: 60%;
    height: 60%;
  }
}

</style>
