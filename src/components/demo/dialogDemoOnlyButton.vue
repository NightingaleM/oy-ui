<demo>
使用函数弹窗
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
