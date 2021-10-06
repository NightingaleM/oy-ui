<demo>
<h2>禁用</h2>
<p>添加 <code>disabled</code></p>
</demo>
<template>
  <Checkbox disabled :checked="true">选择吗？</Checkbox>
  <Checkbox disabled :checked="false">选择吗？</Checkbox>
</template>
<script lang="ts">
import Checkbox from '../../lib/Checkbox/Checkbox.vue';
import {defineComponent, ref} from 'vue';

export default defineComponent({
  components: {
    Checkbox
  },
});
</script>
