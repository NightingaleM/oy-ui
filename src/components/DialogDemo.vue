<template>
  <div>Dialog 示例 -1</div>
  <Button @click="toggle" theme="primary">弹窗用插槽</Button>
  <Dialog v-model:visible="visited">
    <template v-slot:title>标题</template>
    <template v-slot:content>
      <p>多点</p>
      <p><b>再</b>多点</p>
    </template>
    <template v-slot:footer>
      <Button @click="toggle">我自己来</Button>
    </template>
  </Dialog>


  <div>Dialog 示例 -2</div>
  <Button @click="showDialog">一句话弹窗</Button>

</template>
<script lang="ts">
import Button from '../lib/Button.vue';
import Dialog from '../lib/Dialog/Dialog.vue';
import {ref} from 'vue';
import {OpenDialog} from '../lib/Dialog/openDialog.ts';

export default {
  components: {
    Dialog, Button
  },
  setup(props, context) {
    let visited = ref(false);
    let toggle = () => {
      visited.value = !visited.value;
    };

    let showDialog = () => {
      OpenDialog({
        title: 'ggg',
        content: '臭傻逼'
      });
    };
    return {
      toggle,
      showDialog,
      visited,
    };
  },
};
</script>
<style lang="scss">

</style>
