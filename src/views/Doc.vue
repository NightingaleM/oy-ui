<template>
  <div class="layout">
    <TopNav class="nav"/>
    <SideBar class="side-bar"/>
    <main>
      <router-view/>
    </main>
  </div>
</template>
<script lang="ts">
import TopNav from '../components/nav/TopNav.vue';
import {inject, Ref} from 'vue';
import SideBar from '../components/nav/SideBar.vue';

export default {
  components: {TopNav, SideBar},
  setup() {
    const menuVisible = inject<Ref<boolean>>('menuVisible'); // get
    return {menuVisible};
  },
};
</script>
<style lang="scss" scoped>
.layout {
  position: relative;
  z-index: 1;
  background-color: rgba(255,255,255,0.1);
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .side-bar {
    top: 44px;
    height: calc(100% - 54px);
    position: fixed;
    top: 44px;
    left: 0;
  }

  .nav {
    flex-shrink: 0;
  }

  main {
    min-height: calc(100vh - 44px);
    //background-color: #fafafa;
    //flex-grow: 1;
    padding-left: 230px;
    padding-top: 54px;
    //display: flex;
    align-items: center;
    @media (max-width: 650px) {
      //padding-left: 0px;
      padding: 10px;
    }
  }
}

</style>
