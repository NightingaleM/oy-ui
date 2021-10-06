<demo>
<h2>基础用法</h2>
<div><p>Lazy可以接受任意多个组件，每个组件将成一个需要观察（target）的元素。</p>
  <p><code>root</code>是指定的根元素，必须是目标上述传入的目标元素的根元素，若未指定根元素，则默认为浏览器视窗。</p>
  <p><code>threshold:number|number[]</code>，指的是 target 和 root 相交程度，取值范围[0,1]。当达到对应的值的时候，则会触发事件。（这里的时间指显示target)</p>
  <p>默认情况下为 <code>0</code>,意味着target只要有一个像素出现在root中则会触发事件。</p>
</div>
</demo>
<template>
  <div class="lofty-demo-box">
    <div class="placeholder">
      <p>口技</p>
      <p>作者：林嗣环</p>
      <p></p>
      <p></p>
      <p></p>
    </div>
    <Lazy :threshold="0.1" :root="box">
<pre>
  京中有善口技者。会宾客大宴，于厅事之东北角，施八尺屏障，口技人坐屏障中，一桌、一椅、
一扇、一抚尺而已。众宾团坐。少顷，但闻屏障中抚尺一下，满坐寂然，无敢哗者。

  遥闻深巷中犬吠，便有妇人惊觉欠伸，其夫呓语。既而儿醒，大啼。夫亦醒。妇抚儿乳，
儿含乳啼，妇拍而呜之。又一大儿醒，絮絮不止。当是时，妇手拍儿声，口中呜声，儿含乳啼声，
大儿初醒声，夫叱大儿声，一时齐发，众妙毕备。满坐宾客无不伸颈，侧目，微笑，默叹，以
为妙绝。

  未几，夫齁声起，妇拍儿亦渐拍渐止。微闻有鼠作作索索，盆器倾侧，妇梦中咳嗽。宾客意少
舒，稍稍正坐。

  忽一人大呼：“火起”，夫起大呼，妇亦起大呼。两儿齐哭。俄而百千人大呼，百千儿哭，百千犬吠。
中间力拉崩倒之声，火爆声，呼呼风声，百千齐作；又夹百千求救声，曳屋许许声，抢夺声，泼水声。
凡所应有，无所不有。虽人有百手，手有百指，不能指其一端；人有百口，口有百舌，不能名其一
处也。于是宾客无不变色离席，奋袖出臂，两股战战，几欲先走。

  忽然抚尺一下，群响毕绝。撤屏视之，一人、一桌、一椅、一扇、一抚尺而已。
</pre>
    </Lazy>
  </div>
</template>
<script lang="ts">
import Lazy from '../../lib/Lazy.vue';
import {ref,onMounted} from 'vue';

export default {
  components: {
    Lazy
  },
  setup() {
    const box = ref(null)
    onMounted(()=>{
      box.value = document.querySelector('.lofty-demo-box')
    })
    return {box}
  }
};
</script>

<style lang="scss" scoped>
.lofty-demo-box {
  height: 300px;
  overflow-y: scroll;
  .placeholder{
    p {
      padding-top: 100px;
    }
  }
}
</style>
