<template>
  <div class="fix-side-bar" v-if="isPhone && menuVisible" @click.stop="toggle">
    <SideBar/>
  </div>
  <router-view/>
  <div class="box bot-left" id="back-flower">
    <div class="colourless colourless-bot-left"></div>
    <div class="filter-tab filter-bot-left"></div>
  </div>
</template>

<script lang="ts">
import {ref, provide, onMounted} from 'vue';
import {router} from './router';
import SideBar from './components/nav/SideBar.vue';

export default {
  components: {SideBar},
  name: 'App',
  setup() {
    const width = document.documentElement.clientWidth;
    let menuVisible = ref(width <= 650 ? false : true);
    let isPhone = ref(width > 650 ? false : true);
    window.addEventListener('resize', () => {
      const width = document.documentElement.clientWidth;
      menuVisible.value = width <= 650 ? false : true;
      isPhone.value = width > 650 ? false : true;
    });
    provide('menuVisible', menuVisible); // set
    provide('isPhone', menuVisible); // set
    router.afterEach(() => {
      if (width <= 650) {
        menuVisible.value = false;
        isPhone.value = true;
      }
    });
    const toggle = () => {
      menuVisible.value = !menuVisible.value;
    };
    onMounted(() => {
      console.log();
      setTimeout(()=>{

      let t = document.querySelector('.filter-tab')
      t.className += ' filter'
      },5000)
    });
    return {isPhone, toggle, menuVisible};
  },
};
</script>

<style lang="less" scoped>
.fix-side-bar {
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0);
}

#back-flower.box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 50vw !important;
  height: 70% !important;


  .filter-tab {
    position: absolute;
    background-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    width: 100%;
    height: 100%;
    -webkit-mask-size: 0;
    mask-size: 0;
    background-size: 76%;
  }

  .filter {
    -webkit-mask-size: 2000px;
    animation: changeMaskSize_colorful ease-out 3s;
  }

  .filter-bot-left {
    -webkit-mask-image: url(/img/left_bot_b_m.webp);
    mask-image: url(/img/m.webp);
    background-position: 0 100%;
    background-image: url(/img/left_bot_hover.webp);
    -webkit-mask-position: left bottom;
  }

  .colourless {
    position: absolute;
    background-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-animation: changeMaskSize 6s cubic-bezier(.73, .39, .51, .8);
    animation: changeMaskSize 6s cubic-bezier(.73, .39, .51, .8);
    width: 100%;
    height: 100%;
    background-size: 76%;
  }

  .colourless-bot-left {
    background-position: 0 100%;
    -webkit-mask-position: left bottom;
    mask-position: left bottom;
    background-image: url(/img/left_bot.webp);
    -webkit-mask-image: url(/img/left_bot_b_m.webp);
    mask-image: url(/img/left_bot_b_m.webp);
    -webkit-mask-size: 1500px;
    mask-size: 1500px;
  }

}

@keyframes changeMaskSize {
  0% {
    -webkit-mask-size: 0px;
  }
  100% {
    -webkit-mask-size: 1500px;
  }
}

@keyframes changeMaskSize_colorful {
  0% {
    -webkit-mask-size: 0px;
  }
  100% {
    -webkit-mask-size: 400px;
  }
}
</style>
