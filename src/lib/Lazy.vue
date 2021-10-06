<template>
  <div class="oy-lazy-box">
    <div :class="['oy-lazy-target',`oy-lazy-target-${item.key}`]" v-for="item in children" :key="item.key">
      <transition :name="transitionName">
        <component v-if="showStatus[item.key]" :is="item"></component>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';


export default defineComponent({
  name: 'Lazy',
  props: {
    minHeight: {
      type: String,
      default: '200px'
    },
    transitionName: {
      type: String,
      default: 'fade'
    },
    root: { // 根元素
      default: null
    },
    rootMargin: { // 可以像css一样扩展根元素的边界
      default: '5px'
    },
    threshold: { //
      validator: function (value: number | number[]) {
        if (typeof value === 'number') {
          return value <= 1 && value >= 0;
        } else if (value instanceof Array) {
          return value.every(e => (typeof value === 'number' && value <= 1 && value >= 0));
        }
      },
      default: 0
    }
  },
  emits: ['intersectionEvent', 'lazyShowOnce'],
  setup(props, context) {
    const slots = context.slots.default();
    const children = [];
    const {emit} = context;
    const showStatus = ref({});
    slots.forEach(item => {
      if (item.type.toString() === 'Symbol(Fragment)') {
        item.children.forEach(child => {
          if (!child.key) child.key = Math.random().toString(36).slice(-8);
          showStatus.value[child.key] = false;
          children.push(child)
        });
      } else {
        if (!item.key) item.key = Math.random().toString(36).slice(-8);
        showStatus.value[item.key] = false;
        children.push(item)
      }
    });
    const options = {
      root: props.root,
      rootMargin: props.rootMargin,
      threshold: props.threshold
    };
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        const key = entry.target.__vnode.key;
        if (!showStatus.value[key] && entry.isIntersecting) {
          emit('lazyShowOnce', {key: key, entry: entry});
        }
        emit('intersectionEvent', {key: key, entry: entry});
        showStatus.value[key] = showStatus.value[key] || entry.isIntersecting;
      });
    };

    onMounted(() => {
      const observer = new IntersectionObserver(callback, options);
      children.forEach(e => {
        observer.observe(document.querySelector(`.oy-lazy-target-${e.key}`));
      });
      document.querySelectorAll('.oy-lazy-target').forEach(e => {
        e.style['min-height'] = props.minHeight;
      });
    });
    return {
      showStatus,
      children
    };
  }
});
</script>

<style lang="scss">
.oy-lazy-box {

  .oy-lazy-target {
    min-height: auto;
  }

}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .45s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


</style>
