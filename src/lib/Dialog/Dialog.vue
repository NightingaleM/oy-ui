<template>
  <!-- teleport 让这个组件查到body下而不是引入的父组件下 -->
  <teleport to="body">
    <transition name="oy-dialog-animation-overlay">
      <div v-if="visible && visibleByFunction" class="oy-dialog-overlay" @click.stop="close">
        <div class="oy-dialog-wrapper" v-if="visible && visibleByFunction" @click.stop="">
          <header>
            <slot name="title"/>
          </header>
          <div class="oy-dialog-content">
            <slot name="content"/>
          </div>
          <footer>
            <slot name="footer">
              <Button theme="text" outline @click="close">取消</Button>
              <Button theme="text" outline >确定</Button>
            </slot>
          </footer>
        </div>
      </div>
    </transition>
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
    overlay: {
      type: Boolean,
      default: true
    },
    byFunction: {
      // 用于辨别是否是通过调用函数创建的组件
      type: Boolean,
      default: false,
    }
  },
  setup(props, context) {
    const visibleByFunction = ref(true);
    const close = () => {
      if (props.byFunction) {
        visibleByFunction.value = false;
      }
      context.emit('update:visible', !props.visible);
    };
    return {
      visibleByFunction,
      close
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.oy-dialog-wrapper {
  border-radius: 4px;
  background-color: #fff;
  min-width: 30vw;
  max-width: 80vw;
  max-height: 80vh;
  z-index: 11;
  transform-origin: 50% 50%;
  //padding: 5px 10px;

  header {
    display: block;
    padding: 10px 15px;
    border-bottom: 1px solid #e0e0e0;
  }

  div.oy-dialog-content {
    padding: 10px 15px;
    border-bottom: 1px dashed #e0e0e0;
  }
  footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  @media (max-width: 650px) {
    width: 80vw;
  }
}


.oy-dialog-animation-overlay-enter-active,
.oy-dialog-animation-overlay-leave-active {
  transition: all 0.15s ease-in-out;

  .oy-dialog-wrapper {
    transition: all 0.2s ease-in-out;
  }
}

.oy-dialog-animation-overlay-enter-from,
.oy-dialog-animation-overlay-leave-to {
  opacity: 0;

  .oy-dialog-wrapper {
    transform: scale(0.5);
  }
}


</style>
