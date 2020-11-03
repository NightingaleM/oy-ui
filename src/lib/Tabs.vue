<template>
  <div class="oy-tabs">
    <div :class="['oy-tabs-tab-group',
      `oy-tabs-tab-position-${position}`
    ]" ref="tabGroup">
      <div class="oy-tabs-slider-wrapper oy-tabs-slider-wrapper-init" ref="wrapper"></div>
      <div :class="['oy-tabs-tab',
      {active: selected === t},
      {oyTabGrow: grow}]"
           @click="select(t)"
           v-for="(t,index) in titles" :key="index"
           :ref="el => { if(t===selected) ac_el = el }"
      >{{ t }}
      </div>
    </div>
    <div class="oy-tabs-content">
      <component :is="current" :key="current.props.title"></component>
    </div>
  </div>
</template>
<script lang="ts">
import Tab from './Tab.vue';
import {ref, computed, watchEffect, onMounted, onBeforeUnmount} from 'vue';

export default {
  props: {
    grow: {
      type: Boolean,
      default: false
    },
    selected: {
      type: String
    },
    position: {
      type: String,
      default: 'left',
      validator(value: string): boolean {
        return ['right', 'left', 'centered'].indexOf(value) >= 0;
      }
    }
  },
  setup(props, context) {
    let defaults = context.slots.default();
    let titles = [];

    defaults.forEach(tab => {
      titles.push(tab.props.title);
      // @ts-ignore
      if (tab.type.name !== Tab.name) {
        throw new Error('Tabs的子标签必须为Tab');
      }
    });

    let select = (title) => {
      context.emit('update:selected', title);
    };

    let current = computed(() => {
      return defaults.find(e => e.props.title === props.selected);
    });
    let ac_el = ref<HTMLDivElement>(null);
    let wrapper = ref<HTMLDivElement>(null);
    let tabGroup = ref<HTMLDivElement>(null);
    const initWrapper = () => {
      wrapper.value.style.width = ac_el.value.offsetWidth + 'px';
      const {left: left1} = tabGroup.value.getBoundingClientRect();
      const {left: left2} = ac_el.value.getBoundingClientRect();
      const left = left2 - left1 + tabGroup.value.scrollLeft;
      wrapper.value.style.left = left + 'px';
      if (wrapper.value.classList.contains('oy-tabs-slider-wrapper-init')) {
        setTimeout(() => {
          wrapper.value.classList.remove('oy-tabs-slider-wrapper-init');
        }, 0);
      }
    };

    onMounted(() => {
      // 单用watchEffect会在mounted之前掉用，获取不到dom，所以这里在onMounted里再使用.
      watchEffect(() => {
        window.addEventListener('resize', initWrapper);
        initWrapper();
      }, {
        flush: 'post' //  https://github.com/vuejs/vue-next/commit/49bb44756fda0a7019c69f2fa6b880d9e41125aa
      });
    });
    onBeforeUnmount(() => {
      window.removeEventListener('resize', initWrapper);
    });
    return {
      tabGroup,
      wrapper,
      ac_el,
      select,
      titles,
      current
    };
  }
};
</script>
<style lang="scss">
$blue: rgb(94, 95, 226);
.oy-tabs {
  &-tab-group {
    background-color: #00bcd4;
    color: rgba(255, 255, 255, 0.7);
    position: relative;
    display: flex;
    padding: 5px;
    flex-wrap: nowrap;
    overflow-x: auto;
    transition: all 0.3s ease-in-out;


    -ms-overflow-style: -ms-autohiding-scrollbar;

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
      background-color: rgba(0, 0, 0, 0);
    }

    &::-webkit-scrollbar {
      background-color: rgba(0, 0, 0, 0);
      width: 4px;
      height: 6px;
      background-color: rgba(0, 0, 0, 0);
      cursor: pointer;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #ebebeb;
      border-radius: 4px;
      background-clip: padding-box;
      min-height: 28px;
      cursor: pointer;

      &:hover {
        background-color: #d9d9d9;
      }
    }

    &::-webkit-scrollbar-track-piece {
      background-color: rgba(0, 0, 0, 0.04);
    }

    .oy-tabs-slider-wrapper {
      position: absolute;
      height: 2px;
      left: 10px;
      width: 50px;
      bottom: 0;
      background-color: #ffeb3b;
      transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
    }

    .oy-tabs-slider-wrapper-init {
      opacity: 0;
      transition: none;
    }

    .oy-tabs-tab {
      padding: 5px 11px;
      margin: 1px;
      cursor: pointer;
      text-wrap: none;
      white-space: nowrap;
      @media (max-width: 650px) {
        font-size: 12px;
      }

      &.active {
        color: rgb(255, 255, 255)
      }
    }

    .oyTabGrow {
      text-align: center;
      flex-grow: 1;
    }
  }

  &-tab-position-right {
    justify-content: flex-end;
  }

  &-tab-position-left {
  }

  &-tab-position-centered {
    justify-content: center;

  }
}
</style>
