<template>
  <section class="demo-section">
    <h2 class="markdown-body" v-html="title"></h2>
    <div class="demo-card">
      <div class="options">
        <Button @click="sourceCodeToggle" size="mini">CODE</Button>
      </div>
      <div :class="['source-code-box',{visible: sourceCodeStatus}]">
        <Button no-wave theme="text" :class="['copy-btn',`copy-btn-${randomClass}`]">COPY</Button>
        <pre class="language-css" v-html="Prism.highlight(sourceCode,Prism.languages.html,'html')"></pre>
      </div>
      <div class="show-box">
        <component :is="component"></component>
      </div>
    </div>
  </section>
</template>
<script lang="ts">
import Clipboard from 'clipboard';
import Button from '../../lib/Button.vue';
import {onMounted, ref} from 'vue';
import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

const Prism = (window as any).Prism;


export default {
  props: {
    component: Object
  },
  components: {Button},
  setup(props) {
    let sourceCode = props.component?.__sourceCode;
    let title = props.component?.__sourceCodeTitle ?? '';

    let sourceCodeStatus = ref(false);
    const sourceCodeToggle = () => {
      sourceCodeStatus.value = !sourceCodeStatus.value;
    };
    let randomClass = parseInt(`${Math.random() * 1000}`, 10);
    onMounted(() => {
      let clipboard = new Clipboard(`.copy-btn-${randomClass}`, {
        text: () => {
          return sourceCode;
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
      title,
      sourceCode,
      randomClass,
      Prism,
      sourceCodeToggle,
      sourceCodeStatus,
    };
  }
};
</script>
<style lang="scss" scoped>
.demo-section {
  padding: 20px;

  .title-box {

  }

  .demo-card {
    //width: 90%;
    margin: 10px 0;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 10px -2px;
    @media (max-width: 650px) {
      width: 85vw;
    }

    .options {
      background-color: #f5f5f5;
      display: flex;
      justify-content: flex-end;
      padding: 2px 10px;
    }

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

      .language-css {
        margin-top: 0;
      }

      pre {
        white-space: pre-wrap;
        word-wrap: break-word;
        text-shadow: none !important;
        @media (max-width: 650px) {
          font-size: 12px;
        }
      }
    }

    .show-box {
      padding: 15px 15px;
    }
  }
}

</style>
<style lang="scss">
.show-box {
  p {
    font-size: 14px;
    padding-top: 10px;
    padding-bottom: 5px;
  }
}
</style>
