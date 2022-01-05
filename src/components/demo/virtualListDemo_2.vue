<demo>
<div>
  <h2>异步加载数据和指定组件</h2>
  <p>在通常情况下，我们需要展示的不只是一段文字，而是类似于用户信息、资讯之类的。所以该组件也能接受一个组件作为列表的渲染内容。</p>
  <p><code>child</code>接受一个vue组件，该组件需要有一个 <code>infos</code>的 <code>props</code>,用于接受当前项的数据。</p>
  <p><code>@scrollSole</code>事件将在滚动触底时触发，参数为触发时的滚动事件 <code>event</code>。</p>
  <p><code>soleBalance:number</code>属性可以调整触底事件触发位置，默认值为40，指的是距离底部还有40像素时就会触发触底事件。</p>
  <p style="font-size: 12px;"><code>Item</code>组件代码将在后面放出</p>
</div>
</demo>
<template>
  <VirtualList
      :list="list"
      :child="Item"
      @scrollSole="scrollHandle"
      :soleBalance="80"
  >
    <template v-slot:lastOne>
      <p style="text-align: center">正在加载……</p>
    </template>
  </VirtualList>
</template>

<script lang="ts">
import Item from './virtualListDemoItem_1.vue';
import VirtualList from '../../lib/VirtualList.vue';
import {defineComponent, ref, watch, watchEffect} from 'vue';

export default defineComponent({
  components: {VirtualList},
  setup() {
    const page = ref(0);
    const list = ref([]);
    const getting = ref(false);
    const randomColor = () => (Math.random() * 255).toFixed(2);
    const getList = async () => {
      getting.value = true;
      const res = await new Promise((resolve) => {
        const res = [];
        for (let i = (+page.value - 1) * 15; (15 * +page.value) > i; i++) {
          let r = randomColor(), g = randomColor(), b = randomColor();
          res.push({
            height: +((Math.random() * 150) + 50).toFixed(2),
            color: `rgb(${r},${g},${b})`,
          });
        }
        setTimeout(() => {
          // 假装请求很慢
          resolve(res);
        }, Math.random() * 1000);
      });
      list.value.push(...res);
      getting.value = false;
    };
    watch(page, () => {
      getList().then();
    });
    const scrollHandle = () => {
      if (!getting.value) page.value = page.value + 1;
    };
    page.value = 1;
    return {
      list,
      scrollHandle,
      Item,
    };
  }
});
</script>

<style lang="scss">

</style>

