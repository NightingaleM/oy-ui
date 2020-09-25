<template>
  <article class="markdown-body" v-html="content"></article>
</template>
<script lang="ts">
import {ref} from 'vue';

export default {
  props: {
    path: {
      type: String,
      required: true
    }
  },
  setup(props) {
    console.log(props.path);
    let content = ref<string>('');
    import(props.path).then(data=>{
      content.value = data.default
    })
    return {content}
  }
};
</script>
