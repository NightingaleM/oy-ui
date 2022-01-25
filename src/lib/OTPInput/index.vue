<template>
  <input
      :class="['oy-otp-input',{'oy-otp-input-focus':!trulyBlur}]"
      type="text" v-for="index in props.length" :value="values[index-1]"
      @input="inputChange($event,index-1)"
      :ref="el=>inputRefs[index-1] = el"
      @focus="focusHandle(index)"
      @blur="blurHandle(index)"
  >
</template>
<script lang="ts" setup>
import {nextTick, onBeforeMount, onMounted, ref, watch} from 'vue';

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
const valueStr = ref('');
const values = ref([]);
const currentInputIndex = ref(0);
const isOnFocus = ref(false);
const trulyBlur = ref(false);
watch(isOnFocus, () => {
  nextTick(() => {
    trulyBlur.value = !isOnFocus.value;
  });
});
const focusHandle = index => {
  currentInputIndex.value = index - 1;
  isOnFocus.value = true;
};
const blurHandle = index => {
  isOnFocus.value = false;
};
const inputChange = (event, index) => {
  const data = event.data;
  values.value[index] = '';
  values.value[index] = data;
  valueStr.value = values.value.join('');
  emit('update:value', valueStr.value);
  if (currentInputIndex.value === props.length - 1) {
    emit('finish', valueStr.value);
  } else {
    currentInputIndex.value += 1;
  }
};
onBeforeMount(() => {
  valueStr.value = props.value;
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
