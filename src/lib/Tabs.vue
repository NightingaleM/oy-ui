<template>
  <div class="oy-tabs">
    <div :class="['oy-tabs-tab-group',
      `oy-tabs-tab-position-${position}`
    ]" ref="tabGroup">
      <div class="oy-tabs-slider-wrapper oy-tabs-slider-wrapper-init" ref="wrapper"></div>
      <div :class="['oy-tabs-tab',{active: selected === t}]"
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
import {ref, computed, watchEffect, onMounted} from 'vue';

export default {
  props: {
    selected: {
      type: String
    },
    position: {
      type: String,
      default: 'right',
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
      const left = left2 - left1;
      wrapper.value.style.left = left + 'px';
      if (wrapper.value.classList.contains('oy-tabs-slider-wrapper-init')) {
        setTimeout(() => {
          wrapper.value.classList.remove('oy-tabs-slider-wrapper-init');
        }, 0);
      }
    };

    onMounted(() => {
      // 单用watchEffect会在mounted之前掉用，获取不到dom，所以这里在onMounted里再使用.
      watchEffect(initWrapper,{
        flush: 'post' //  https://github.com/vuejs/vue-next/commit/49bb44756fda0a7019c69f2fa6b880d9e41125aa
      });
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
    position: relative;
    display: flex;
    padding: 5px;

    .oy-tabs-slider-wrapper {
      position: absolute;
      height: 2px;
      left: 10px;
      width: 50px;
      bottom: 0;
      background-color: #a0cfff;
      transition: left 0.3s ease-in-out, width 0.3s ease-in-out;
    }

    .oy-tabs-slider-wrapper-init {
      opacity: 0;
      transition: none;
    }

    .oy-tabs-tab {
      padding: 5px 8px;
      margin: 5px;
      cursor: pointer;

      &.active {
        color: $blue;
      }
    }
  }

  &-tab-position-right {

  }

  &-tab-position-left {
    justify-content: flex-end;
  }

  &-tab-position-centered {
    justify-content: center;

  }
}
</style>
