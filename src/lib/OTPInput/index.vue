<template>
  <input
      :class="['oy-otp-input',{'oy-otp-input-focus':!trulyBlur}]"
      type="text" v-for="index in props.length" :value="values[index-1]"
      :key="index"
      @input="inputChange($event,index-1)"
      :ref="el=>inputRefs[index-1] = el"
      @focus="focusHandle(index-1)"
      @blur="blurHandle(index-1)"
      @keydown.delete="deleteKeydownHandle($event,index-1)"
  >
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
  disabled: true,
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
const deleteKeydownHandle = (event, index) => {
  for (let i = index; i < props.length; i++) {
    if (i !== props.length - 1) values.value[i] = values.value[i + 1];
    else values.value[i] = '';
  }
  nextTick(() => {
    currentInputIndex.value = index === 0 ? 0 : index - 1;
  });
};
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
      currentInputIndex.value += 1;
    }
  } else {
    for (let i = currentInputIndex.value; i < Math.min(value.length, props.length); i++) {
      values.value[i] = value[i - currentInputIndex.value];
    }
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
  inputRefs.value[0].focus();
  isOnFocus.value = true;
  currentInputIndex.value = 0;
});
watch(currentInputIndex, () => {
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
}

.oy-otp-input-focus {
  border: 2px solid #00bcd4;

  &:hover {
    border-color: #00bcd4;
  }
}
</style>
