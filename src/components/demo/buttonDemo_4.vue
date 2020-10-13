<demo>
<h2>立体感</h2>
<p>给予了一定的阴影，显得有立体的感觉。属性：<code>elevation</code>，可选值：<code>1,2,3,4</code></p>
</demo>
<template>
  <Button elevation="1" theme="text">默认按钮</Button>
  <Button elevation="2" theme="success">成功按钮</Button>
  <Button elevation="3" outline theme="danger">危险按钮</Button>
  <Button elevation="4" disabled theme="primary">主要按钮</Button>
</template>
<script lang="ts">
import Button from '../../lib/Button.vue';

export default {
  components: {
    Button
  },
};
</script>
