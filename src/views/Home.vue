<template>
  <div class="top-nav-and-banner">
    <Topnav/>
    <div class="banner">
      <h1><span>O</span>Y_U<span>I</span></h1>
      <h2>一个UI 框架</h2>
      <p class="actions">
        <a href="https://github.com">GitHub</a>
        <router-link to="/doc/intro">开始</router-link>
      </p>
    </div>
  </div>
  <main>
    <section>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-Vue"></use>
      </svg>
      使用了Vue3 Composition API
    </section>
    <section>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-typescript"></use>
      </svg>
      源代码采用TypeScript书写（非严格检查）
    </section>
  </main>

</template>
<script lang="ts">
import Topnav from '../components/nav/TopNav.vue';

export default {
  components: {Topnav},
};
</script>
<style lang="scss" scoped>

$green: #02bcb0;
$light-blue: rgba(227, 255, 253, 1);
$border-radius: 3px;
$dark: #1d2c40;
.top-nav-and-banner {
  background: linear-gradient(90deg, rgba(227, 255, 253, 1) 0%, rgba(183, 233, 230, 1) 100%);
  clip-path: ellipse(73% 74% at 50% 25%);
  @media only screen and (max-width: 650px) {
    clip-path: ellipse(100% 65% at 50% 25%)
  }

  .banner {
    color: #28d1c9;
    padding: 100px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      span {
        color: $dark
      }
    }

    //background: lightgreen;
    > .actions {
      padding: 8px 0;

      a {
        color: #fff;
        margin: 0 8px;
        background: $green;
        display: inline-block;
        $h: 28px;
        height: $h;
        line-height: $h;
        border-radius: $border-radius;
        padding: 0 8px;
        text-decoration: none;
      }
    }
  }
}

main {
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  width: 80%;
  margin: 0 auto;

  @media (max-width: 650px) {
    grid-template-columns: repeat(1, 100%);
    grid-gap: 5px;
  }

  section {
    display: grid;
    grid-template-columns: repeat(1, 1fr 4fr);
    grid-gap: 5px;
  }

  .icon {
    display: block;
    font-size: 3.5em;
  }
}

</style>
