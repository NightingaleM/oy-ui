<template>
  <article class="markdown-body" v-html="content">
  </article>
</template>

<script lang="ts">
import {
  ref
} from 'vue'
import 'prismjs/themes/prism-tomorrow.css';

export default {
  props: {
    content: {
      type: String,
      required: true
    }
  }
}
</script>
