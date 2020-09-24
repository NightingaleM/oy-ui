<template>
  <div class="oy-tabs">
    <div class="oy-tabs-tab-group" ref="tabGroup">
      <div class="oy-tabs-slider-wrapper" ref="wrapper"></div>
      <div :class="['oy-tabs-tab',{active: selected === t}]"
           @click="select(t)"
           v-for="(t,index) in titles" :key="index"
           :ref="el => {if(t===selected) ac_el = el }"
      >
        {{ t }}
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
    }
  },
  setup(props, context) {
    let defaults = context.slots.default();
    let titles = [];

    defaults.forEach(tab => {
      titles.push(tab.props.title);
      if (tab.type !== Tab) {
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
    };

    onMounted(() => {
      // 单用watchEffect会在mounted之前掉用，获取不到dom，所以这里在onMounted里再使用.
      watchEffect(initWrapper);
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

    .oy-tabs-slider-wrapper {
      position: absolute;
      height: 2px;
      left: 0;
      width: 50px;
      bottom: 0;
      background-color: #a0cfff;
      transition: all 0.3s ease-in-out;
    }

    .oy-tabs-tab {
      padding: 5px 8px;
      margin: 5px;

      &.active {
        color: $blue;
      }
    }
  }
}
</style>
