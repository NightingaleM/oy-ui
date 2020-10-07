<template>
  <section>
    <h2>{{ switchDemo.__sourceCodeTitle }}</h2>
    <component :is="switchDemo"/>
    <div class="source-code-box">
      <pre class="language-css" v-html="Prism.highlight(switchDemo.__sourceCode,Prism.languages.html,'html')"></pre>
    </div>
  </section>
</template>
<script lang="ts">
import switchDemo from './demo/switchDemo.vue';
import 'prismjs';
import 'prismjs/themes/prism.css';
const Prism = (window as any).Prism;

export default {
  setup() {
    return {
      switchDemo,
      Prism
    };
  }
};
</script>
