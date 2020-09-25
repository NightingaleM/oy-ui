<template>
  <article class="markdown-body" v-html="md"></article>
</template>
<script>
import md from '../md/install.md'

export default {
  data() {
    return {md}
  }
}
</script>
