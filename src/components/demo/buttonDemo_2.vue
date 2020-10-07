<demo>
禁用状态
</demo>
<template>
  <Button disabled> 默认按钮</Button>
  <Button theme="primary" disabled>主要按钮</Button>
  <Button theme="success" disabled>成功按钮</Button>
  <Button theme="info" disabled>信息按钮</Button>
  <Button theme="warning" disabled>警告按钮</Button>
  <Button theme="danger" disabled>危险按钮</Button>
  <Button theme="text" disabled>文本按钮</Button>
</template>
<script lang="ts">
import Button from '../../lib/Button.vue';

export default {
  components: {
    Button
  },
};
</script>
