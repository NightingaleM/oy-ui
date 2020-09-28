<template>
  <div class="oy-button">
    <!-- $attrs 包含了所有传递过来的事件和属性，如果不手动绑定的话，将绑定到组件的最外穿元素   -->
    <button :class="[theme ? 'oy-button-theme-' + theme:'',
    size? 'oy-button-size-' + size:'',
    'oy-button-main']" v-bind="$attrs">
      <span><slot>Button</slot></span>
    </button>
  </div>
</template>
<script lang="ts">
export default {
  inheritAttrs: false, // 标示不自动将属性传递到组件最外层元素
  props: {
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

  }
};
</script>
<style lang="scss">
.oy-button {
  display: inline-block;
  margin: 5px 10px;
  padding: 0;

  .oy-button-main {
    outline: none;
    padding: 8px 16px;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    color: #fff;
    background-color: transparent;

    span {
      font-size: 14px;
      text-align: center;
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
  }

  .oy-button-theme-primary {
    background-color: #409eff;
    border: #409eff;

    &[disabled] {
      background-color: #a0cfff;
    }
  }

  .oy-button-theme-success {
    background-color: #67c23a;
    border: #67c23a;

    &[disabled] {
      background-color: #dddddd;
    }
  }

  .oy-button-theme-info {
    background-color: #909399;
    border: #909399;

    &[disabled] {
      background-color: #c8c9cc;
    }
  }

  .oy-button-theme-warning {
    background-color: #e6a23c;
    border: #e6a23c;

    &[disabled] {
      background-color: #f3d19e;
    }
  }

  .oy-button-theme-danger {
    background-color: #f56c6c;
    border: #f56c6c;

    &[disabled] {
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
}
</style>











