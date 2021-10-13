<template>
  <div :class="['oy-time-pickers',`oy-time-pickers-key-${random}`]">
    <div class="oy-time-pickers-header">
      <span @click="changeTarget('h')">{{ currentHour }}</span>:<span @click="changeTarget('m')">{{
        currentMinute
      }}</span><span v-if="useSeconds" @click="changeTarget('s')">:{{ currentSecond }}</span>
    </div>

    <div class="oy-time-picker-clock">
      <div class="oy-time-picker-click-panel" @mousedown="pickerEvent">
        <span :class="['oy-time-picker-item',
        {'oy-time-picker-item-enabled': i.enabled},
        {'oy-time-picker-item-visible': i.visible}
        ]"
              :style="calcCircleStyle(i,pickers.length)"
              v-for="i in pickers" :key="i"
        >
          {{ i.visible ? i.value : '' }}
        </span>
      </div>
    </div>

  </div>
</template>
<script lang="ts">
import {computed, onMounted, ref} from 'vue';

export default {
  props: {
    useSeconds: {
      type: Boolean,
      default: false
    },
    allowedHours: {
      type: Function || Array,
      default: undefined
    },
    allowedMinutes: {
      type: Function || Array,
      default: undefined
    },
    allowedSeconds: {
      type: Function || Array,
      default: undefined
    },
    format: {
      type: String,
      default: '24hr',
      validator: v => {
        return v === '24hr' || v === 'ampm';
      }
    }
  },
  setup(props, context) {
    const random = parseInt(`${Math.random() * 1000}`);
    const currentHour = ref('');
    const currentMinute = ref('');
    const currentSecond = ref('');
    const timeType = ref(props.format === '24hr' ? 24 : 12); // 12 24
    const currentTarget = ref('h'); // h m s
    const PROPS_MAP = {
      h: props.allowedHours,
      m: props.allowedMinutes,
      s: props.allowedSeconds
    };
    const pickers = computed(() => {
      const length = currentTarget.value === 'h' ? timeType.value : 60;
      const list = new Array(length).fill(0);
      return list.map((e, i) => {
        let enabled = true;
        const handle = PROPS_MAP[currentTarget.value];
        if (handle) {
          if (handle instanceof Function) enabled = !!handle(i);
          else enabled = handle.indexOf(i) >= 0;
        }
        return {
          value: i,
          visible: currentTarget.value !== 'h' ? !(i % 5) : true,
          enabled: enabled
        };
      });
    });
    const panelDom = ref(null);
    onMounted(() => {
      panelDom.value = document.querySelector(`.oy-time-pickers-key-${random} .oy-time-picker-click-panel`);
      // panelDom.value.addEventListener('mousedown', pickerEvent);
    });
    const pick = (item) => {
      if (!item.enabled) return;
      setCurrentValue(item.value, true);
    };
    const setCurrentValue = (value, next?) => {
      const target = currentTarget.value;
      switch (target) {
        case 'h':
          currentHour.value = value;
          break;
        case 'm':
          currentMinute.value = value;
          break;
        case 's':
          currentSecond.value = value;
          break;
      }
      if (!next) return;
      const nextTarget = target === 's' ? 's' : (props.useSeconds && target === 'm') ? 's' : 'm';
      changeTarget(nextTarget);
    };
    const changeTarget = type => {
      currentTarget.value = type;
    };
    const calcCircleStyle = (item, l) => {
      const i = item.value;
      if (l === 24) {
        const angle = 360 / (l / 2);
        const p1 = [0, 0];
        const p2 = [];
        if (i > 11) {
          p2[0] = p1[0] + 25 * Math.cos(angle * (i - 12) * Math.PI / 180) + 50;
          p2[1] = p1[1] + 25 * Math.sin(angle * (i - 12) * Math.PI / 180) + 50;
        } else {
          p2[0] = p1[0] + 50 * Math.cos(angle * i * Math.PI / 180) + 50;
          p2[1] = p1[1] + 50 * Math.sin(angle * i * Math.PI / 180) + 50;
        }
        return `bottom: ${p2[0]}%;left: ${p2[1]}%`;
      } else {
        const angle = 360 / l;
        const p1 = [0, 0];
        const p2 = [];
        p2[0] = p1[0] + 50 * Math.cos(angle * i * Math.PI / 180) + 50;
        p2[1] = p1[1] + 50 * Math.sin(angle * i * Math.PI / 180) + 50;
        return `bottom: ${p2[0]}%;left: ${p2[1]}%`;
      }
    };
    const pickerMoveEvent = ($event) => {
      const panel = panelDom.value;
      pickerEventHandle($event);
    };
    const pickerUpEvent = ($event) => {
      const panel = panelDom.value;
      pickerEventHandle($event, true);
      panel.removeEventListener('mousemove', pickerMoveEvent);
      panel.removeEventListener('mouseup', pickerUpEvent);
    };
    const pickerEvent = ($event) => {
      const panel = panelDom.value;
      panel.addEventListener('mousemove', pickerMoveEvent);
      panel.addEventListener('mouseup', pickerUpEvent);

    };
    const pickerEventHandle = ($event, next?) => {
      const panel = panelDom.value;
      const target = $event.target;
      let X = $event.offsetX;
      let Y = $event.offsetY;
      if (target !== panel && [...target.classList].indexOf('oy-time-picker-item') >= 0) {
        X = X + target.offsetLeft;
        Y = Y + target.offsetTop;
      }
      let angle = (Math.atan(Math.abs(X - 100) / Math.abs(Y - 100)) * 180 / Math.PI);
      if (X - 100 < 0 && Y - 100 <= 0) {
        angle = 360 - angle;
      } else if (X - 100 <= 0 && Y - 100 >= 0) {
        angle = 180 + angle;
      } else if (X - 100 >= 0 && Y - 100 > 0) {
        angle = 180 - angle;
      }
      const l = pickers.value.length;
      if (l !== 24) {
        const cellAngle = 360 / l;
        let i = (angle + cellAngle / 2) / cellAngle;
        i = +parseInt(i.toString());
        if (i === l) i = 0;
        if (!pickers.value[i].enabled) return;
        setCurrentValue(i, next);
      } else {
        const distance = (X - 100) / Math.sin(angle * Math.PI / 180);
        const cellAngle = 360 / (l / 2);
        let i = (angle + cellAngle / 2) / cellAngle;
        i = distance < 55 ? i + 12 : i;
        i = +parseInt(i.toString());

        if (i === l) i = 0;
        if (!pickers.value[i].enabled) return;
        setCurrentValue(i, next);
      }
    };
    return {
      pick, pickerEvent,
      pickers, random,
      calcCircleStyle,
      // minutes, seconds,
      currentTarget, changeTarget,
      currentHour, currentMinute, currentSecond
    };
  }
};
</script>
<style lang="scss">
.oy-time-pickers {
  .oy-time-pickers-header {

  }

  .oy-time-picker-clock {
    position: relative;
    width: 240px;
    height: 320px;
    border: 1px solid #ccc;
    border-radius: 3px;

    .oy-time-picker-click-panel {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 200px;
      border: 1px solid #000;
      border-radius: 50%;

      .oy-time-picker-item {
        position: absolute;
        user-select: none;
        color: #999;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        transform: translate(-50%, 50%);
      }

      .oy-time-picker-item-enabled {
        color: #000
      }

      .oy-time-picker-item-visible {
        width: 15px;
        height: 15px;
        font-size: 12px;
        text-align: center;
        line-height: 15px;
      }
    }

  }

}


</style>
