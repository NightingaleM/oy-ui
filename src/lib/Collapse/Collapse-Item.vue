<template>
  <div class="oy-collapse-item">
    <div class="oy-collapse-header" @click="change">
      <slot v-if="!title" name="title"></slot>
      <span v-else>{{ title }}</span>
    </div>
    <div :class="['oy-collapse-content',{'oy-collapse-content-active': active}]" ref="contentRef">
      <slot name="default"></slot>
    </div>
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
            contentRef.value.style.height = parseInt(targetHeight, 10) + 20 + 'px';
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
  border-radius: 4px;
  border-bottom: 1px solid rgba(118, 118, 118, 0.2);
  padding: 16px 24px;

  .oy-collapse-header {
    font-size: 14px;
    cursor: pointer;
  }

  .oy-collapse-content {
    //max-height: 0;
    transition: height ease-in-out 0.25s, margin ease-in-out 0.25s, padding ease-in-out 0.25s;
    overflow: hidden;
  }

  .oy-collapse-content-active {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(118, 118, 118, 0.1);
    //height: auto;
    //max-height: 1000px
  }
}

</style>
