<template>
  <div class="oy-button">
    <!-- $attrs 包含了所有传递过来的事件和属性，如果不手动绑定的话，将绑定到组件的最外穿元素   -->
    <button ref="btn" :class="[theme ? 'oy-button-theme-' + theme:'',
    size? 'oy-button-size-' + size:'',
    'oy-button-elevation-' + elevation,
    outline? 'oy-button-outline' :'',
    'oy-button-main']" v-bind="$attrs">
      <span><slot>Button</slot></span>
    </button>
  </div>
</template>
<script lang="ts">
import {onMounted, ref} from 'vue';

export default {
  inheritAttrs: false, // 标示不自动将属性传递到组件最外层元素
  props: {
    outline: {
      type: Boolean,
      default: false,
    },
    elevation: {
      type: [String, Number],
      default: 0,
      validator(value: string | number): boolean {
        let v = parseInt(`${value}`, 10);
        return v >= 0 || v <= 4;
      }
    },
    theme: {
      type: String,
      default: 'plain',
      validator(value: string): boolean {
        return ['plain', 'primary', 'success', 'info', 'warning', 'danger', 'text'].indexOf(value) >= 0;
      }
    },
    loading: {
      type: Boolean,
    },
    size: {
      type: String,
      default: '',
      validator(value: string): boolean {
        return ['', 'medium', 'small', 'mini'].indexOf(value) >= 0;
      }
    }
  },
  setup() {
    let btn = ref<HTMLDivElement>(null);
    const waveHandle = function ($ref) {
      let timer1 = null;
      let timer2 = null;
      const downHandle = downEvent => {
        if ([...downEvent.path[0].classList].indexOf('oy-wave') >= 0) {
          return;
        }
        ;
        let st = new Date().getTime();
        const mouseUpHandel = (upEvent) => {
          let et = new Date().getTime();
          let delay = 0;
          if (et - st < 300) {
            delay = 300 - (et - st);
          }
          setTimeout(() => {
            span.className += ' oy-wave-remove';
            setTimeout(() => {
              $ref.value.removeChild(span);
            }, 150);
          }, delay);
          // $ref.value.removeEventListener('mouseup', mouseUpHandel);
        };

        let span = document.createElement('span');
        span.className = 'oy-wave';
        span.style.position = 'absolute';
        span.style.left = downEvent.offsetX + 'px';
        span.style.top = downEvent.offsetY + 'px';
        $ref.value.append(span);
        $ref.value.addEventListener('mouseup', mouseUpHandel, {once: true});
      };
      $ref.value.addEventListener('mousedown', downHandle);
    };
    onMounted(() => {
      if (btn.value.disabled) return;
      waveHandle(btn);
    });
    return {
      btn
    };
  }
};
</script>
<style lang="scss">
.oy-button {
  display: inline-block;
  margin: 5px 10px;
  padding: 0;

  .oy-button-main {
    overflow: hidden;
    position: relative;
    outline: none;
    padding: 8px 16px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    color: #fff;
    background-color: transparent;
    cursor: pointer;

    span {
      font-size: 14px;
      text-align: center;
    }

    &[disabled] {
      cursor: not-allowed;
    }
  }

  .oy-button-size-medium {
    padding: 6px 12px;
  }

  .oy-button-size-small {
    padding: 5px 10px;

    span {
      font-size: 12px;
    }
  }

  .oy-button-size-mini {
    padding: 4px 8px;

    span {
      font-size: 12px;
    }
  }


  .oy-button-theme-plain {
    color: #333;

    &[disabled] {
      color: #c0c4cc;
    }
  }

  .oy-button-theme-primary {
    background-color: #409eff;
    border: 1px solid #409eff;

    &.oy-button-outline {
      background-color: transparent;
      color: #409eff
    }

    &[disabled] {
      border: 1px solid #a0cfff;
      background-color: #a0cfff;
    }
  }

  .oy-button-theme-success {
    background-color: #67c23a;
    border: 1px solid #67c23a;

    &.oy-button-outline {
      background-color: transparent;
      color: #67c23a
    }

    &[disabled] {
      border: 1px solid #dddddd;
      background-color: #dddddd;
    }
  }

  .oy-button-theme-info {
    background-color: #909399;
    border: 1px solid #909399;

    &.oy-button-outline {
      background-color: transparent;
      color: #909399
    }

    &[disabled] {
      border: 1px solid #c8c9cc;
      background-color: #c8c9cc;
    }
  }

  .oy-button-theme-warning {
    background-color: #e6a23c;
    border: 1px solid #e6a23c;

    &.oy-button-outline {
      background-color: transparent;
      color: #e6a23c
    }

    &[disabled] {
      border: 1px solid #f3d19e;
      background-color: #f3d19e;
    }
  }

  .oy-button-theme-danger {
    background-color: #f56c6c;
    border: 1px solid #f56c6c;

    &.oy-button-outline {
      background-color: transparent;
      color: #f56c6c
    }

    &[disabled] {
      border: 1px solid #fab6b6;
      background-color: #fab6b6;
    }
  }

  .oy-button-theme-text {
    color: #409eff;
    border: none;
    background-color: transparent;

    &[disabled] {
      color: #c0c4cc;
    }
  }

  .oy-button-elevation-1 {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12) !important
  }

  .oy-button-elevation-2 {
    box-shadow: 0 3px 3px -2px rgba(0, 0, 0, .2), 0 3px 4px 0 rgba(0, 0, 0, .14), 0 1px 8px 0 rgba(0, 0, 0, .12) !important
  }

  .oy-button-elevation-3 {
    box-shadow: 0 3px 4px 0px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12) !important
  }

  .oy-button-elevation-4 {
    box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12) !important
  }
}

.oy-wave {
  background-color: currentColor;
  opacity: 0.4;
  animation: oy-wave-in 0.3s forwards ease-in;
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.oy-wave-remove {
  opacity: 0;
  transition: opacity 0.15s;
}

@keyframes oy-wave-in {
  0% {
    width: 0%;
    padding-top: 0%;
    padding-bottom: 0%;
  }
  100% {
    width: 220%;
    padding-top: 110%;
    padding-bottom: 110%;
  }
}


</style>


