<demo>
<h2>使用函数调用弹窗</h2>
<p>引入 <code>OpenDialog</code>函数，调用函数进行弹窗。</p>
</demo>
<template>
  <Button @click="showDialog" theme="primary">点击弹窗</Button>
</template>
<script lang="ts">
import Button from '../../lib/Button.vue';
import {OpenDialog} from '../../lib/Dialog/openDialog.ts';

export default {
  components: {
    Button
  },
  setup(props, context) {
    let showDialog = () => {
      OpenDialog({
        title: '弹窗标题',
        content: '弹窗内容。'
      });
    };
    return {
      showDialog
    };
  },
};
</script>
