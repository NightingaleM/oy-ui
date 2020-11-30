<demo>
<h2>collapseDemo</h2>
<p>扩展面板</p>
</demo>
<template>
  <Collapse v-model:activeNames="activeNames">
    <CollapseItem title="鹅" name="1">
      <p>鹅鹅鹅，曲项向天歌，白毛浮绿水，红掌拨清波</p>
    </CollapseItem>
    <CollapseItem name="2">
      <template #title><h4>⛰️⛰️⛰️山行</h4>
      </template>
      <template #default>
        <pre>
远上寒山石径斜，白云生处有人家,
停车坐爱枫林晚，霜叶红于二月花。
        </pre>
      </template>
    </CollapseItem>
    <CollapseItem title="九月九日忆山东兄弟" name="3">
      <p>……</p>
    </CollapseItem>
  </Collapse>
</template>
<script lang="ts">
import Collapse from '../../lib/Collapse/Collapse.vue';
import CollapseItem from '../../lib/Collapse/Collapse-Item.vue';
import {ref} from 'vue';

export default {
  components: {
    Collapse,
    CollapseItem
  },
  setup(props) {
    const activeNames = ref(['1']);
    return {
      activeNames
    };
  }
};
</script>
