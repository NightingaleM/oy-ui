<template>
  <div class="oy-pagination-box" v-if="hideOnOnePage ? pages!==1 : true">
    <Button
        v-if="layout.match('prev')"
        @click="pre"
        :disabled="disable ||currentPage===1" size="mini" theme="text"
        class="oy-pagination-layout-btn oy-pagination-last">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zuo"></use>
      </svg>
    </Button>
    <ul>
      <li>
        <Button :disabled="disable" size="medium" :theme="currentPage===1? 'primary':'text'"
                @click="changePageHandle(1)">1
        </Button>
      </li>
      <li v-if="vir_pages[0]>2">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shenglvehao"></use>
        </svg>
      </li>
      <li v-for="i in vir_pages" :key="i">
        <Button :disabled="disable" size="medium" :theme="currentPage===i ? 'primary':'text'"
                @click="changePageHandle(i)">{{ i }}
        </Button>
      </li>
      <li v-if="vir_pages[vir_pages.length-1]< pages-1">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shenglvehao"></use>
        </svg>
      </li>
      <li>
        <Button :disabled="disable" size="medium"
                v-if="pages!==1"
                :theme="currentPage===pages ? 'primary':'text'" @click="changePageHandle(pages)">{{
            pages
          }}
        </Button>
      </li>
    </ul>
    <Button
        v-if="layout.match('next')"
        @click="next"
        :disabled="disable||currentPage===pages"
        size="mini" theme="text" class="oy-pagination-layout-btn oy-pagination-next">
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
    currentPage: { // 当前页数
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
      default: '',
      validator: function (value) {
        if (!value) return true;
        value.split(',').forEach(v => {
          if (['prev', 'next', 'jumper'].indexOf(v) === -1) {
            throw 'layout in <Pagination> only support \'prev,next,jumper\'';
          }
        });
        return true;
      }
    },
    hideOnOnePage: { // 只有一页是否隐藏
      type: Boolean,
      default: false
    },
    pageCount: { // 页码按钮数量必须是奇数
      type: Number,
      validator: function (value) {
        return value >= 5 && value <= 13 && !!(value % 2);
      },
      default: 7
    }
  },
  setup(props, context) {
    const pages = ref<number>(1);
    const vir_pages = ref<[number]>([]);
    const changePageHandle = (page) => {
      context.emit('update:currentPage', page);
      context.emit('changePage', page);
    };
    const pre = () => {
      let page = props.currentPage - 1;
      page = page < 1 ? 1 : page;
      context.emit('prevClick', page);
      changePageHandle(page);
    };
    const next = () => {
      let page = props.currentPage + 1;
      page = page > pages.value ? pages.value : page;
      context.emit('nextClick', page);
      changePageHandle(page);
    };


    watchEffect(() => {
      pages.value = parseInt(props.total / props.pageSize + (props.total % props.pageSize ? 1 : 0), 10);
      if (pages.value > props.pageCount) {
        if (props.currentPage >= pages.value - (props.pageCount - 4)) { // 快到最后了
          vir_pages.value = [...makeArray(
              ((pages.value - (props.pageCount - 2)) > 1 ? (pages.value - (props.pageCount - 2)) : 2),
              pages.value - 1)];
        } else if (props.currentPage > ((props.pageCount - 3) / 2 < 2 ? 2 : (props.pageCount - 4))) { // 到中间
          vir_pages.value = [...makeArray(
              props.currentPage - ((props.pageCount - 3) / 2),
              (props.currentPage + (props.pageCount - 5) > pages.value - 1 ? pages.value - 1 : props.currentPage + ((props.pageCount - 3) / 2)))];
        } else { // 刚开始
          vir_pages.value = [...makeArray(
              2,
              ((props.pageCount - 2) > (pages.value - 1) ? (pages.value - 1) : (props.pageCount - 1)))];
        }
      } else {
        let h = makeArray(1, pages.value);
        h.shift();
        h.pop();
        vir_pages.value = [...h];
      }
    });

    return {
      pre, next,
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
