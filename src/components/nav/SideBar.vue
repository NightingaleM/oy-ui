<template>
  <nav class="side-bar" v-if="menuVisible">
    <ul>
      <li v-for="i in navList">
        <router-link :to="i[1]">{{ i[0] }}</router-link>
      </li>
    </ul>
  </nav>
</template>
<script lang="ts">
import {onMounted,inject, Ref,ref,} from 'vue';

export default {
  props: {},
  setup(props, context) {
    const filterDom = ref<HTMLDocument>(null)
    const menuVisible = inject<Ref<boolean>>('menuVisible'); // get
    const navList = [
      ['介绍', '/doc/intro'],
      ['安装', '/doc/install'],
      ['开始使用', '/doc/get-start'],
      ['Dialog', '/doc/dialog'],
      ['Button', '/doc/button'],
      ['Switch', '/doc/switch'],
      ['Checkbox', '/doc/checkbox'],
      ['Tabs', '/doc/tabs'],
      ['Collapse', '/doc/collapse'],
      ['TreeView', '/doc/TreeView'],
      ['Pagination', '/doc/pagination'],
      ['Transfer', '/doc/transfer'],
      ['Lazy', '/doc/lazy'],
      ['TimePicker', '/doc/timePicker'],
      ['VirtualList', '/doc/virtualList'],
      ['OTP Input', '/doc/otpInput'],

    ];
    onMounted(()=>{
      filterDom.value = document.querySelector('.filter')

    })

    return {
      menuVisible,
      navList
    };
  }
};
</script>
<style lang="scss" scoped>
$green: #42b983;
$light-blue: rgba(227, 255, 253, 1);
$border-radius: 3px;
$dark: #1d2c40;
.side-bar {
  padding-top: 20px;
  padding-left: 15px;
  position: absolute;
  top: 0;
  height: 100%;
  width: 200px;
  border-right: 2px solid #f0f0f0;
  ul {
    li {
      padding: 5px 12px;
      a {
        color: $dark;
        text-decoration: none;
        padding-bottom: 2px;
        &.router-link-exact-active{
          border-bottom: 2px solid $green;
        }
      }
    }
  }

  @media (max-width: 650px) {
    background-color: #f9f9f9;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
}
</style>
