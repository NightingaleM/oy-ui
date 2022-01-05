<demo>
<div>
  <h2>基本操作</h2>
  <p><code>list</code>接受一个数组,其中的 <code>height:number</code>属性将表明每一项元素的高度。 <code>content:string</code>属性将作为默认展示文本。</p>
  <p><code>itemHeight:number</code>默认值为50，单位固定为 <code>px</code>,指每一项的默认高度，当 <code>list</code>里的某一项没有指定
    <code>height</code>属性时，将使用该值指定为 <code>height</code>。</p>
  <p><code>v-slot:lastOne</code>将存在于列表的最下方，当滚到最低不是可见。默认情况下无内容。</p>
</div>
</demo>
<template>
  <VirtualList
      :list="list"
  >
    <template v-slot:lastOne>
      <p>到底了，别滚了</p>
    </template>
  </VirtualList>
</template>

<script lang="ts">
import VirtualList from '../../lib/VirtualList.vue';
import {defineComponent, ref, watch, watchEffect} from 'vue';

const LIST = [];
for (let i = 0; 50000 > i; i++) {
  LIST.push({
    content: `这是内容 ${i + 1}`,
    height: +((Math.random() * 150) + 50).toFixed(2),
  });
}
export default defineComponent({
  components: {VirtualList},
  setup() {
    const list = ref(LIST);
    return {
      list,
    };
  }
});
</script>

<style lang="scss">

</style>

