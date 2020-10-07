<template>
  <section>
    <h2>使用插槽弹窗</h2>
    <component :is="dialogDemo"/>
    <div class="source-code-box">
      <pre class="language-css" v-html="Prism.highlight(dialogDemo.__sourceCode,Prism.languages.html,'html')"></pre>
    </div>
  </section>
  <section>
    <h2>使用函数弹窗</h2>
    <component :is="dialogDemoOnlyButton"/>
    <div class="source-code-box">
      <pre class="language-css" v-html="Prism.highlight(dialogDemoOnlyButton.__sourceCode,Prism.languages.html,'html')"></pre>
    </div>
  </section>
</template>
<script lang="ts">
import Button from '../lib/Button.vue';
import dialogDemo from './demo/dialogDemo.vue';
import dialogDemoOnlyButton from './demo/dialogDemoOnlyButton.vue';
import 'prismjs';
import 'prismjs/themes/prism.css'
// import 'prismjs/themes/prism-okaidia.css'
const Prism = (window as any).Prism
export default {
  components: {
    Button,
  },
  setup(props, context) {
    return {
      dialogDemoOnlyButton,
      dialogDemo,
      Prism
    };
  },
};
</script>
<style lang="scss">

</style>
