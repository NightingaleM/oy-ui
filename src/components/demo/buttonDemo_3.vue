<demo>
<h2>大小</h2>
<p>按钮可以设置成不同尺寸，可选值：<code>medium,small,mini</code></p>
</demo>
<template>
  <Button> 默认按钮</Button>
  <Button size="medium"> 默认按钮</Button>
  <Button size="small"> 默认按钮</Button>
  <Button size="mini"> 默认按钮</Button>
</template>
<script lang="ts">
import Button from '../../lib/Button.vue';

export default {
  components: {
    Button
  },
};
</script>
