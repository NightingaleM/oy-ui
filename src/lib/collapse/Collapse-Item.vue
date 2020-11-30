<template>
  <div class="oy-collapse-item">
    <div class="oy-collapse-header" @click="change">
      <slot v-if="!title" name="title"></slot>
      <span v-else>{{ title }}</span>
    </div>
    <transition name="router-slid">
      <div :class="['oy-collapse-content',{'oy-collapse-content-active': active}]" ref="contentRef">
        <slot name="default"></slot>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import {watch, ref, onMounted, computed, watchEffect, reactive} from 'vue';

export default {
  props: {
    activeNames: {
      type: Array,
      default: []
    },
    title: {
      type: String,
    },
    name: {
      type: String,
      require: true
    }
  },
  setup(props, context) {
    const contentRef = ref<HTMLDivElement>(null);
    const change = () => {
      let _n = props.activeNames;
      let index = props.activeNames.indexOf(props.name);
      if (index < 0) {
        _n.push(props.name);
      } else {
        _n.splice(index, 1);
      }
      context.emit('update:activeNames', _n);
    };
    const active = ref(false);
    // const active = computed(() => {
    //   return props.activeNames.indexOf(props.name) >= 0;
    // });
    watch(
        props.activeNames, (names, prevValue, c) => {
          let _active = names.indexOf(props.name) >= 0;
          if (active.value !== _active) {
            active.value = _active;
          }
        }
    );
    onMounted(() => {
      active.value = props.activeNames.indexOf(props.name) >= 0;
      watchEffect(() => {
        if (active.value && typeof window.getComputedStyle !== 'undefined') {
          contentRef.value.style.height = 'auto';
          let targetHeight = window.getComputedStyle(contentRef.value).height;
          contentRef.value.style.height = '0px';
          setTimeout(() => {
            contentRef.value.style.height = targetHeight;
          }, 0);
        } else if (!active.value) {
          contentRef.value.style.height = '0px';
        }
      });
    });

    return {
      contentRef,
      active,
      change
    };
  }
};
</script>

<style lang="scss">

.oy-collapse-item {
  .oy-collapse-header {

  }

  .oy-collapse-content {
    background-color: #cccccc;
    //max-height: 0;
    transition: height ease-in-out 0.25s;
    overflow: hidden;
  }

  .oy-collapse-content-active {
    //height: auto;
    //max-height: 1000px
  }
}

.router-slid-enter-active, .router-slid-leave-active {
  transition: all .4s;
}

.router-slid-enter, .router-slid-leave-active {
  transform: translate3d(0, 3rem, 0);
  opacity: 0;
}
</style>
