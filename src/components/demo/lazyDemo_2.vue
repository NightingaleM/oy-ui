<demo>
<h2>多个Target</h2>
<div>
  <p>当传入多个target时，建议带上key，当你需要对每个target出现时做处理时，key值会帮到你。</p>
  <p><code>transition-name</code>可以指定你自定义的出现动画。就像使用 <code>transition</code> 组件一样。</p>
  <p><code>alreadyShow</code>事件是在target第一次出现时被调用。</p>
  <p><code>intersectionEvent</code>事件是每个target触发了原生事件时被调用。</p>
  <p>两个事件带的参数均为 <code>{key,entry}</code>entry 为原生事件，key为传入的key值，如果没有则是随机生成的字符串。</p>
</div>

</demo>
<template>
  <div class="lofty-demo-box">
    <p class="hold">往下滚动⬇️</p>
    <Lazy
        :threshold="[0.8]"
        min-height="20px"
        @intersectionEvent="intersectionEvent"
        @lazyShowOnce="alreadyShow"
        transition-name="reversal"
    >
      <p v-for="(item,index) in speech" :key="index">{{ item }}</p>
      <Button theme='text'>__________</Button>
    </Lazy>
  </div>
</template>
<script lang="ts">
import Lazy from '../../lib/Lazy.vue';
import Button from '../../lib/Button.vue';

const CONTEXT = [
  '大江东去，浪淘尽，千古风流人物。',
  '故垒西边，人道是，三国周郎赤壁。',
  '乱石穿空，惊涛拍岸，卷起千堆雪。(穿空 一作：崩云)',
  '江山如画，一时多少豪杰。',
  '遥想公瑾当年，小乔初嫁了，雄姿英发。',
  '羽扇纶巾，谈笑间，樯橹灰飞烟灭。(樯橹 一作：强虏)',
  '故国神游，多情应笑我，早生华发。',
  '人生如梦，一尊还酹江月。(人生 一作：人间；尊 同：樽)',
];

export default {
  components: {
    Lazy, Button
  },
  setup(props, context) {
    const speech = CONTEXT;
    const intersectionEvent = ({key, entry}) => {
      console.log('key:', key, entry.isIntersecting, entry.intersectionRatio);
    };
    const alreadyShow = ({key, entry}) => {
      console.log('key:', key, entry);
    };
    return {
      alreadyShow,
      intersectionEvent,
      speech
    };
  }
};
</script>

<style lang="scss" scoped>
.lofty-demo-box {
  height: calc(60vh + 500px);

  .hold {
    padding-bottom: 40vh;
  }
}

</style>
<style>
.reversal-enter-active {
  animation: reversal-in .6s ease-in;
}

.reversal-leave-active {
  animation: reversal-in .4s reverse ease-in;
}

@keyframes reversal-in {
  0% {
    opacity: 0;
    transform: rotateX(-90deg);
  }
  60% {
    transform: rotateX(0deg);
  }
  95% {
    transform: rotateX(50deg);
  }
  100% {
    opacity: 1;
    transform: rotateX(0deg);
  }
}
</style>
