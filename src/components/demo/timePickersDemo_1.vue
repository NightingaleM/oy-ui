<demo>
<h2>基本操作</h2>
<p></p>
</demo>
<template>
  --- {{ value1 }} ---

  <div class="box">
    <TimePickers
        v-model:picker="value1"
        :width="500"
    />
<!--      <p>&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;</p>-->
    <TimePickers
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
}
</style>
