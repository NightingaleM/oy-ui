<template>
  <button :class="[{'oy-checked':value},'oy-button']" @click="toggle">
    <span></span>
  </button>
</template>
<script lang="ts">
  import {ref} from 'vue';

  export default {
    props: {
      value: Boolean,
    },
    setup(props, context) {
      console.log(props.value);
      const checked = ref(false);
      const toggle = () => {
        // NOTE: emit的事件名，必须和props的名字一样
        context.emit('update:value', !props.value);
      };
      return {checked, toggle};

    }
  };
</script>
<style lang="scss" scoped>
  $h: 22px;
  $h2: $h - 4px;
  .oy-button {
    cursor: pointer;
    border: none;
    border-radius: 5px;
    width: $h * 2;
    height: $h;
    position: relative;
    border-radius: $h / 2;
    outline: none;
    background-color: crimson;
    user-select: none;
    outline: none;
    span {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 2px;
      height: $h2;
      width: $h2;
      border-radius: 50%;
      background-color: white;
      transition: left 0.15s ease-in, width 0.1s ease-in, margin-left 0.1s ease-in, height 0.1s ease-in;

      &:hover {
        //height: $h2;
        //width: $h2 + 5px;
      }
    }
  }

  .oy-checked {
    background-color: aqua;
    transition: background-color 0.25s ease-in;

    span {
      left: calc(100% - #{$h2} - 2px);

      &:hover {
        //margin-left: -5px;
      }
    }
  }


</style>
