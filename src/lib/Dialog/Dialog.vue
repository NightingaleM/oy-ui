<template>
<!-- teleport 让这个组件查到body下而不是引入的父组件下 -->
  <teleport to="body">
    <template v-if="visible">
      <div class="oy-dialog-overlay" @click="closeWithOverlay"></div>
      <div class="oy-dialog-wrapper">
        <header><slot name="title" /></header>
        <div class="oy-dialog-content"><slot name="content" /></div>
        <slot name="footer">
          <Button @click="close">取消</Button>
          <Button theme="primary">确定</Button>
        </slot>
      </div>
    </template>
  </teleport>
</template>

<script lang="ts">
import Button from '../Button.vue';
import {ref} from 'vue';

export default {
  components: {
    Button
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
  },
  setup(props, context) {
    const close = () => {
      console.log('ddd');
      context.emit('update:visible', !props.visible);
    };
    const closeWithOverlay = () => {
      if (props.visible) {
        context.emit('update:visible', !props.visible);
      }
    };
    return {
      close, closeWithOverlay
    };
  }
};
</script>

<style lang="scss">
.oy-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.2);
}

.oy-dialog-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  background-color: #fff;
  min-width: 30vw;
  z-index: 11;
  header {
    display: block;
    padding: 5px 3px;
  }
  div.oy-dialog-content {
    padding: 5px 3px;
  }
}
</style>
