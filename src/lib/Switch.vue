<template>
  <button :class="[{'oy-checked':value},'oy-button']" :disabled="disable"
          @click="toggle">
    <span></span>
  </button>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
const props = defineProps({
  value: Boolean,
  disable: Boolean,
})
const emit = defineEmits()
const checked = ref(false);
const toggle = () => {
  // NOTE: emit的事件名，必须和props的名字一样
  emit('update:value', !props.value);
};

</script>
<style lang="scss">
$h: 14px;
$h2: $h + 4px;
$w: 34px;
.oy-button {
  z-index: 0;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  width: $w;
  height: $h;
  position: relative;
  border-radius: calc($h / 2);
  outline: none;
  background-color: #c4c4c4;
  user-select: none;
  outline: none;

  span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0px;
    height: $h2;
    width: $h2;
    border-radius: 50%;
    background-color: #fff;
    transition: left 0.15s ease-in, width 0.1s ease-in, margin-left 0.1s ease-in, height 0.1s ease-in;
    z-index: 6;
    box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);

    &:after {
      content: '';
      display: block;
      position: absolute;
      height: $h2;
      width: $h2;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      z-index: 5;
      background-color: #fff;
      transition: background-color 0.25s ease;
    }

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      z-index: 4;
      background-color: rgba(0, 0, 0, 0);
      transition: background-color 0.2s ease;
    }

    &:hover {
      //height: $h2;
      &:before {
        width: $h2 * 1.8;
        height: $h2 * 1.8;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.8;
  }
}

.oy-checked {
  background-color: #74a4d9;
  transition: background-color 0.15s ease-in;

  span {
    left: calc(100% - #{$h2});
    background-color: #1867c0;

    &:after {
      background-color: #1867c0;
    }

    &:hover {
      &:before {
        background-color: rgba(24, 103, 192, 0.2);
      }
    }
  }
}


</style>
