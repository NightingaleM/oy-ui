<template>
  <div class="oy-pagination-box">
    <Button theme="text" class="oy-pagination-layout-btn oy-pagination-last">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zuo"></use>
      </svg>
    </Button>
    <ul>
      <li>
        <Button :theme="currentPage===1? 'success':'text'" @click="changePageHandle(1)">1</Button>
      </li>
      <li v-if="vir_pages[0]>2">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shenglvehao"></use>
        </svg>
      </li>
      <li v-for="i in vir_pages" :key="i">
        <Button :theme="currentPage===i ? 'success':'text'" @click="changePageHandle(i)">{{ i }}</Button>
      </li>
      <li v-if="vir_pages[vir_pages.length-1]< pages-1">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shenglvehao"></use>
        </svg>
      </li>
      <li>
        <Button :theme="currentPage===pages ? 'success':'text'" @click="changePageHandle(pages)">{{ pages }}</Button>
      </li>
    </ul>
    <Button theme="text" class="oy-pagination-layout-btn oy-pagination-next">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-you"></use>
      </svg>
    </Button>
  </div>
</template>
<script lang="ts">
import Button from './Button.vue';
import {ref, watchEffect,} from 'vue';

const makeArray = (s: number, e: number): [number] => {
  let a = [];
  for (let i = s; i <= e; i++) {
    a.push(i);
  }
  return a;
};

export default {
  name: 'pagination',
  components: {Button},
  props: {
    currentPage: {
      type: Number,
      require: true,
      default: 1
    },
    total: { // 数据总数
      type: Number,
      require: true,
    },
    pageSize: { // 每页显示条数
      type: Number,
      default: 10,
    },
    disable: { // 禁用
      type: Boolean,
      default: false
    },
    layout: { // 布局
      type: String,
    },
    hideOnOnePage: { // 只有一页是否隐藏
      type: Boolean,
      default: false
    },
    pageCount: { // 页码按钮数量必须是奇数
      type: Number,
      default: 7
    }
  },
  setup(props, context) {
    const {emit} = context;
    const pages = ref<number>(1);
    // const currentPage = ref<number>(1);
    const vir_pages = ref<[number]>([]);
    const changePageHandle = (page) => {
      // currentPage.value = page;
      emit('changePage', page);
    };

    watchEffect(() => {
      pages.value = parseInt(props.total / props.pageSize + (props.total % props.pageSize ? 1 : 0), 10);
      if (pages.value > props.pageCount) {
        if (props.currentPage >= pages.value - 3) {
          vir_pages.value = [...makeArray(((pages.value - 5) > 1 ? (pages.value - 5) : 1), pages.value - 1)];
        } else if (props.currentPage > 3) {
          vir_pages.value = [...makeArray(props.currentPage - 2, (props.currentPage + 2 > pages.value - 1 ? pages.value - 1 : props.currentPage + 2))];
        } else {
          vir_pages.value = [...makeArray(2, (5 > (pages.value - 1) ? (pages.value - 1) : 5))];
        }
      } else {
        let h = makeArray(1, pages.value);
        h.shift();
        h.pop();
        vir_pages.value = [...h];
      }
    });

    return {
      vir_pages,
      pages,
      changePageHandle
    };
  }
};
</script>
<style lang="scss">
.oy-pagination-box {
  display: flex;
  justify-content: center;
  align-items: center;

  .oy-pagination-layout-btn {
  }

  ul {
    display: flex;
    justify-content: center;
    align-items: center;

    li {

    }
  }
}
</style>
