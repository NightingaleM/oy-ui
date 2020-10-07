<template>
  <section>
    <h2>{{ tabsDemo.__sourceCodeTitle }}</h2>
    <component :is="tabsDemo"/>
    <div class="source-code-box">
      <pre class="language-css" v-html="Prism.highlight(tabsDemo.__sourceCode,Prism.languages.html,'html')"></pre>
    </div>
  </section>
</template>
<script lang="ts">
import tabsDemo from './demo/tabsDemo.vue';
import 'prismjs';
import 'prismjs/themes/prism.css';

const Prism = (window as any).Prism;
export default {
  setup() {
    return {
      tabsDemo,
      Prism
    };
  }
};
</script>
<style lang="sass">

</style>

