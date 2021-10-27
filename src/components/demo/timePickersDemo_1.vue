<demo>
<h2>基本操作</h2>
<div>
  <p> <code>width:number|string</code>可以设置组件宽度，默认宽度为240。</p>
  <p> <code>format:'24hr'|'ampm'</code>可以切换24小时格式和12小时格式。注意，该属性只定义时钟面板展示样式，数据输出始终保持24小时格式。</p>
  <p> <code>useSeconds:boolean</code>使用"秒"面板，返回结果也将出现"秒"。</p>
</div>
</demo>
<template>
  <p>__{{ value1 }}__</p>
  <div class="box">
    <TimePickers
        class="picker"
        v-model:picker="value1"
        :width="500"
    />
    <TimePickers
        useSeconds
        v-model:picker="value1"
        format="ampm"
    />
  </div>

</template>
<script lang="ts">
import TimePickers from '../../lib/TimePickers/index.vue';
import {ref, watch} from 'vue';

export default {
  components: {
    TimePickers
  },
  setup() {
    const value1 = ref('10:44:00');
    return {
      value1
    };
  },
};
</script>
<style>
.box {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.picker {
  margin-bottom: 20px;
}
</style>
