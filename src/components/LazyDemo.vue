<template>
  <h2>Lazy 示例</h2>
  <p>该组件使用到了 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API">Intersection Observer API</a>。
  该 API 还有部分兼容性问题，该组件对兼容性问题暂未处理，请考虑您产品的使用环境后酌情使用。</p>
  <DemoCard v-for="(item,index) in demo"
            :key="index"
            :component="item">
  </DemoCard>
</template>
<script lang="ts">
import DemoCard from './public/DemoCard.vue';
import lazyDemo_1 from './demo/lazyDemo_1.vue';
import lazyDemo_2 from './demo/lazyDemo_2.vue';

export default {
  components: {DemoCard},
  setup() {
    return {
      demo: [
        lazyDemo_1,
        lazyDemo_2,
      ],
    };
  }
};
</script>
