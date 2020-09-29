<template>
  <div>
    Button 示例
    <br>
    <section>
      <h5>基础用法</h5>
      <div>
        <Button> 默认按钮</Button>
        <Button theme="primary">主要按钮</Button>
        <Button theme="success">成功按钮</Button>
        <Button theme="info">信息按钮</Button>
        <Button theme="warning">警告按钮</Button>
        <Button theme="danger">危险按钮</Button>
        <Button theme="text">文本按钮</Button>
      </div>
      <div>
        <Button outline> 默认按钮</Button>
        <Button outline theme="primary">主要按钮</Button>
        <Button outline theme="success">成功按钮</Button>
        <Button outline theme="info">信息按钮</Button>
        <Button outline theme="warning">警告按钮</Button>
        <Button outline theme="danger">危险按钮</Button>
      </div>
    </section>
    <section>
      <h5>禁用状态</h5>
      <div>
        <Button disabled> 默认按钮</Button>
        <Button theme="primary" disabled>主要按钮</Button>
        <Button theme="success" disabled>成功按钮</Button>
        <Button theme="info" disabled>信息按钮</Button>
        <Button theme="warning" disabled>警告按钮</Button>
        <Button theme="danger" disabled>危险按钮</Button>
        <Button theme="text" disabled>文本按钮</Button>
      </div>
    </section>
    <section>
      <h5>按钮大小</h5>
      <Button> 默认按钮</Button>
      <Button size="medium"> 默认按钮</Button>
      <Button size="small"> 默认按钮</Button>
      <Button size="mini"> 默认按钮</Button>
    </section>
    <section>
      <h5>立体感</h5>
      <Button elevation="1" theme="text"> 默认按钮</Button>
      <Button elevation="2" outline theme="success"> 默认按钮</Button>
      <Button elevation="3" theme="danger"> 默认按钮</Button>
      <Button elevation="4" disabled theme="primary"> 默认按钮</Button>
    </section>
  </div>
</template>
<script lang="ts">
import Button from '../lib/Button.vue';
import {ref} from 'vue';

export default {
  components: {Button},
  setup() {

  }
};
</script>
