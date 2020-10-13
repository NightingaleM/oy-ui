<demo>
Dialog使用插槽弹窗
</demo>
<template>
  <Button @click="toggle" theme="primary">点击弹窗</Button>
  <Dialog v-model:visible="visited">
    <template v-slot:title>标题</template>
    <template v-slot:content>
      <p>弹窗内容</p>
      <p><b>内</b>容</p>
    </template>
    <template v-slot:footer>
      <Button theme="text" @click="toggle">我知道了</Button>
    </template>
  </Dialog>
</template>
<script lang="ts">
import Button from '../../lib/Button.vue';
import Dialog from '../../lib/Dialog/Dialog.vue';
import {ref} from 'vue';

export default {
  components: {
    Dialog, Button
  },
  setup(props, context) {
    let visited = ref(false);
    let toggle = () => {
      visited.value = !visited.value;
    };
    return {
      toggle,
      visited,
    };
  },
};
</script>
