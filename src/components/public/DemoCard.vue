<template>
  <div class="demo-card">
    <div class="options">
      <Button @click="sourceCodeToggle">code</Button>
    </div>
    <div :class="['source-code-box',{visible: sourceCodeStatus}]">
      <Button theme="text" :class="['copy-btn',`copy-btn-${randomClass}`]">COPY</Button>
      <pre class="language-css" v-html="Prism.highlight(sourceCode,Prism.languages.html,'html')"></pre>
    </div>
    <div class="show-box">
      <slot/>
    </div>
  </div>
</template>
<script lang="ts">
import Clipboard from 'clipboard';
import Button from '../../lib/Button.vue';
import {onMounted, ref} from 'vue';
import 'prismjs';
import 'prismjs/themes/prism.css';

const Prism = (window as any).Prism;


export default {
  props: {
    sourceCode: {
      type: String,
      required: true,
    }
  },
  components: {Button},
  setup(props) {
    let sourceCodeStatus = ref(false);
    const sourceCodeToggle = () => {
      sourceCodeStatus.value = !sourceCodeStatus.value;
    };
    let randomClass = parseInt(`${Math.random() * 1000}`, 10);
    onMounted(() => {
      let clipboard = new Clipboard(`.copy-btn-${randomClass}`, {
        text: () => {
          return props.sourceCode;
        }
      });
      clipboard.on('success', function (e) {
      });
      clipboard.on('error', function (e) {
        console.log('异常错误： ' + JSON.stringify(e.message));
        console.log(e);
      });
    });
    return {
      randomClass,
      Prism,
      sourceCodeToggle,
      sourceCodeStatus,
    };
  }
};
</script>
<style lang="scss" scoped>
.demo-card {
  width: 80%;
  margin: 10px auto;
  background-color: #fff;
  box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.2);

  .source-code-box {
    max-height: 0;
    overflow: auto;
    transition: max-height 0.25s ease-in-out;
  }

  .visible {
    max-height: 50vh;
  }

  .source-code-box {
    position: relative;
    .copy-btn {
      position: absolute;
      right: 0;
    }
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      @media (max-width: 650px) {
        font-size: 12px;
      }
    }
  }
}

</style>
