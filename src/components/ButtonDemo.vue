<template>
  <div>
    Button 示例
    <br>
    <section v-for="(item,index) in demo"  :key="index">
      <h2>{{item.__sourceCodeTitle}}</h2>
      <component :is="item"/>
      <div class="source-code-box">
        <pre class="language-css" v-html="Prism.highlight(item.__sourceCode,Prism.languages.html,'html')"></pre>
      </div>
    </section>
  </div>
</template>
<script lang="ts">
import buttonDemo_1 from './demo/buttonDemo_1.vue';
import buttonDemo_2 from './demo/buttonDemo_2.vue';
import buttonDemo_3 from './demo/buttonDemo_3.vue';
import buttonDemo_4 from './demo/buttonDemo_4.vue';

import 'prismjs';
import 'prismjs/themes/prism.css';
const Prism = (window as any).Prism;
export default {
  setup() {
    return {
      demo: [
        buttonDemo_1,
        buttonDemo_2,
        buttonDemo_3,
        buttonDemo_4,
      ],
      Prism
    };
  }
};
</script>
