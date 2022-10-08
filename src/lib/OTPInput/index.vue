<template>
  <input
      :class="['oy-otp-input',{'oy-otp-input-focus':!trulyBlur},{'oy-otp-input-disabled': props.disabled}]"
      :type="type==='number' ? 'number':'text'"
      v-for="index in props.length"
      :value="props.type === 'password'  ?  values[index-1] ? '*':'' : values[index-1]"
      :key="index"
      @input="inputChange($event,index-1)"
      :ref="el=>inputRefs[index-1] = el"
      @focus="focusHandle(index-1)"
      @blur="blurHandle(index-1)"
      @keydown.delete="deleteKeydownHandle($event,index-1)"
      @keydown.left="leftKeydownHandle($event,index-1)"
      @keydown.right="rightKeydownHandle($event,index-1)"
      :disabled="props.disabled"
  >
  <!--      @click="initiativeFocus(index)"-->
</template>
<script lang="ts" setup>
import {computed, nextTick, onBeforeMount, onMounted, ref, watch} from 'vue';

interface Props {
  disabled?: boolean;
  type?: 'password' | 'text' | 'number';
  length?: number;
  value: string | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  type: 'text',
  length: 6,
  defaults: ''
});
const emit = defineEmits<{
  (e: 'finish', value: string | number | undefined): void
  (e: 'update:value', value: string | number | undefined): void
}>();

const inputRefs = ref([]);
const valueStr = computed(() => {
  return values.value.join('');
});
const values = ref([]);
const currentInputIndex = ref(0);
const isOnFocus = ref(false);
const trulyBlur = ref(false);
watch(isOnFocus, () => {
  nextTick(() => {
    trulyBlur.value = !isOnFocus.value;
  });
});
const leftKeydownHandle = (event, index) => {
  currentInputIndex.value = index === 0 ? 0 : index - 1;
};
const rightKeydownHandle = (event, index) => {
  currentInputIndex.value = index === props.length - 1 ? props.length - 1 : index + 1;
};
const deleteKeydownHandle = (event, index) => {
  // if (event.key !== 'Backspace') return;
  for (let i = index; i < props.length; i++) {
    if (i !== props.length - 1) values.value[i] = values.value[i + 1];
    else values.value[i] = '';
  }
  nextTick(() => {
    currentInputIndex.value = index === 0 ? 0 : index - 1;
  });
};
/**
 * 主动点击的输入需要判断点击的是不是最后一个空值，
 * 如果不是则自动跳到最后一个空值再输入，
 * 如果是则直接从这开始修改
 * @param index
 */
// const initiativeFocus = index => {
//   let lastEmptyIndex = index - 1;
//   if (!values.value[lastEmptyIndex]) {
//     for (let i = values.value.length - 1; i >= 0; i--) {
//       console.log(i,!!values.value[i])
//       if (values.value[i]) {
//         lastEmptyIndex = i + 1;
//         break;
//       }
//     }
//     if (lastEmptyIndex === index) lastEmptyIndex = 0;
//   }
//   currentInputIndex.value = lastEmptyIndex;
//   isOnFocus.value = true;
// };
const focusHandle = index => {
  currentInputIndex.value = index;
  isOnFocus.value = true;
};
const blurHandle = index => {
  isOnFocus.value = false;
};
const inputChange = (event, index) => {
  if (event.inputType === 'deleteContentBackward') {
    nextTick(() => {
      inputRefs.value[index].value = values.value[index];
    });
    return;
  }

  const data = event.data;
  const value = [...event.target.value];
  if (data) {
    values.value[index] = '';
    values.value[index] = data;
    emit('update:value', valueStr.value);
    if (currentInputIndex.value === props.length - 1) {
      emit('finish', valueStr.value);
    } else {
      currentInputIndex.value = index + 1;
    }
  }
  if (event.inputType === 'insertFromPaste') {
    for (let i = currentInputIndex.value; i < Math.min(value.length, props.length); i++) {
      values.value[i] = '';
      values.value[i] = value[i - currentInputIndex.value];
    }
    emit('update:value', valueStr.value);
    if (values.value.length === props.length) {
      emit('finish', valueStr.value);
      currentInputIndex.value = props.length - 1;
    } else {
      currentInputIndex.value = values.value.length;
    }
  }
};
onBeforeMount(() => {
  if (props.value?.length) {
    values.value = [...props.value].map(e => e);
  }
});
onMounted(() => {
  if (!props.disabled) {
    inputRefs.value[0].focus();
    isOnFocus.value = true;
    currentInputIndex.value = 0;
  }
});
watch(currentInputIndex, (v, ov) => {
  console.log(v, ov);
  inputRefs.value[currentInputIndex.value].focus();
  isOnFocus.value = true;
});

</script>

<style lang="scss">
.oy-otp-input {
  width: 35px;
  border-radius: 3px;
  height: 35px;
  //outline: none;
  border: 1px solid #ccc;
  text-align: center;
  line-height: 25px;
  font-size: 16px;
  margin-right: 10px;

  &:hover {
    border-color: #1d2c40;
  }

  &[type=number]::-webkit-inner-spin-button,
  &[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type=number] {
    -moz-appearance: textfield;
  }
}

.oy-otp-input-focus {
  border: 2px solid #00bcd4;

  &:hover {
    border-color: #00bcd4;
  }
}
.oy-otp-input-disabled {
  border: 2px solid #999;

  &:hover {
    cursor: not-allowed;
  }
}
</style>
