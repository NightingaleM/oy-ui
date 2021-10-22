<template>
  <div :class="['oy-time-pickers',`oy-time-pickers-key-${random}`]" :style="{width:parseInt(`${width}`)+'px'}">
    <div class="oy-time-pickers-header">
      <span @click="changeTarget('h')">{{ currentHour ?? '--' }}</span>:<span @click="changeTarget('m')">{{
        currentMinute ?? '--'
      }}</span><span v-if="useSeconds" @click="changeTarget('s')">:{{ currentSecond ?? '--' }}</span>
    </div>

    <div class="oy-time-picker-clock">
      <div class="oy-time-picker-am-pm" v-if="format==='ampm'">
        <span @click="amOrPm='am'">AM</span>
        <span @click="amOrPm='pm'">PM</span>
      </div>
      <div class="oy-time-picker-click-panel" @mousedown.capture="pickerEvent">
        <span class="oy-oy-time-picker-needle"
              :style="needleStyle"
        ></span>
        <span :class="['oy-time-picker-item',
        `oy-item-picker-item-${i.value}`,
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
import {computed, nextTick, onMounted, ref, watch} from 'vue';

export default {
  props: {
    width: {
      type: Number || String,
      default: 240
    },
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
    },
    picker: {
      type: String || null,
      validator: v => {
        return Object.is(v, null) || !v.match(/[a-zA-Z]./g);
      }
    }
  },
  setup(props, context) {
    const {emit} = context;
    const R = 100;
    const amOrPm = ref('am');
    const inputValueList = props.picker ? props.picker.split(':') : [null, null, null];
    const random = parseInt(`${Math.random() * 1000}`);
    const currentHour = ref(inputValueList[0]);
    const currentMinute = ref(inputValueList[1]);
    const currentSecond = ref(inputValueList[2] ?? null);
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
    const currentValue = computed(() => {
      const target = currentTarget.value;
      let value = 0;
      switch (target) {
        case 'h':
          value = currentHour.value;
          break;
        case 'm':
          value = currentMinute.value;
          break;
        case 's':
          value = currentSecond.value;
          break;
      }
      return value;
    });
    const panelDom = ref(null);
    watch([currentHour, currentMinute, currentSecond], () => {
      if (props.useSeconds && currentHour.value && currentMinute.value && currentSecond.value) {
        emit('update:picker', `${currentHour.value}:${currentMinute.value}:${currentSecond.value}`);
      } else if (currentHour.value && currentMinute.value) {
        emit('update:picker', `${currentHour.value}:${currentMinute.value}`);
      }
      ;
    });
    let needleAngle = 0;
    onMounted(() => {
      panelDom.value = document.querySelector(`.oy-time-pickers-key-${random} .oy-time-picker-click-panel`);
      moveNeedle(currentValue.value);
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
      setTimeout(() => {

        changeTarget(nextTarget);
      }, 50);
    };
    const changeTarget = type => {
      currentTarget.value = type;
      moveNeedle(currentValue.value);
    };
    const moveNeedle = value => {
      const l = pickers.value.length;
      if (l === 24) {
        const cellAngle = 360 / (l / 2);
        const angle = (value > 11 ? value - 12 : value) * cellAngle;
        setNeedleStyle(angle, value > 11);
      } else {
        const cellAngle = 360 / l;
        const angle = value * cellAngle;
        setNeedleStyle(angle);
      }
    };
    const calcCircleStyle = (item, l) => {
      const i = item.value;
      const contrastTarget = currentTarget.value === 'h' ? currentHour : currentTarget.value === 'm' ? currentMinute : currentSecond;
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
        return `bottom: ${p2[0]}%;left: ${p2[1]}%; ${contrastTarget.value === i ? 'border: 1px solid #ccc;' : ''}`;
      } else {
        const angle = 360 / l;
        const p1 = [0, 0];
        const p2 = [];
        p2[0] = p1[0] + 50 * Math.cos(angle * i * Math.PI / 180) + 50;
        p2[1] = p1[1] + 50 * Math.sin(angle * i * Math.PI / 180) + 50;
        return `bottom: ${p2[0]}%;left: ${p2[1]}%;  ${contrastTarget.value === i ? 'border: 1px solid #ccc;' : ''}`;
      }
    };
    const pickerMoveEvent = ($event) => {
      const panel = panelDom.value;
      pickerEventHandle($event);
    };
    const pickerUpEvent = ($event) => {
      const panel = panelDom.value;
      pickerEventHandle($event, true);
      removeEventList();
    };
    const removeEventList = () => {
      const panel = panelDom.value;
      panel.removeEventListener('mousemove', pickerMoveEvent, true);
      panel.removeEventListener('mouseup', pickerUpEvent, true);
    };
    const pickerEvent = ($event) => {
      const panel = panelDom.value;
      panel.addEventListener('mousemove', pickerMoveEvent, true);
      panel.addEventListener('mouseup', pickerUpEvent, true);
    };
    const needleStyle = ref('transform: rotate(0deg);');
    const pickerEventHandle = ($event, next?) => {
      const panel = panelDom.value;
      const target = $event.target;
      let X = $event.offsetX;
      let Y = $event.offsetY;
      if (target !== panel && ([...target.classList].indexOf('oy-time-picker-item') >= 0)) {
        X = X + target.offsetLeft;
        Y = Y + target.offsetTop;
      } else if ([...target.classList].indexOf('oy-oy-time-picker-needle') >= 0) {
        const x_ = +getComputedStyle(target).height.replace('px', '');
        X = R + Math.sin(needleAngle * Math.PI / 180) * x_;
        Y = (R * Math.tan(needleAngle * Math.PI / 180) - Math.sin(needleAngle * Math.PI / 180) * x_) / Math.tan(needleAngle * Math.PI / 180);
      }
      let angle = (Math.atan(Math.abs(X - R) / Math.abs(Y - R)) * 180 / Math.PI);
      if (X - R === 0) {
        angle = Y - R > 0 ? 180 : 0;
      } else if (Y - R === 0) {
        angle = X - R > 0 ? 90 : 270;
      } else if (X - R < 0 && Y - R < 0) {
        angle = 360 - angle;
      } else if (X - R < 0 && Y - R > 0) {
        angle = 180 + angle;
      } else if (X - R > 0 && Y - R > 0) {
        angle = 180 - angle;
      } else if (X - R > 0 && Y - R < 0) {
      } else if (X - R === 0 && Y - R === 0) return;
      const l = pickers.value.length;
      if (l !== 24) {
        const cellAngle = 360 / l;
        let i = (angle + cellAngle / 2) / cellAngle;
        i = +parseInt(i.toString());
        if (i === l) i = 0;
        if (!pickers.value[i].enabled) return;
        setCurrentValue(i, next);
        setNeedleStyle(i * cellAngle);
      } else {
        const distance = (X - R) / Math.sin(angle * (Math.PI / 180));
        const cellAngle = 360 / (l / 2);
        let i = (angle + cellAngle / 2) / cellAngle;
        i = distance < 55 ? i + 12 : i;
        i = +parseInt(i.toString());
        if (i === l) i = 0;
        if (!pickers.value[i].enabled) return;
        setCurrentValue(i, next);
        setNeedleStyle(((i > 11 ? i - 12 : i) * cellAngle), distance < 55);
      }
    };
    const setNeedleStyle = (angle, short?) => {
      needleAngle = angle;
      needleStyle.value = `transform: rotate(${angle}deg); height: ${short ? 'calc(25% - 4px)' : 'calc(50% - 4px)'};`;
      // needleStyle.value = `transform: rotate(${angle}deg) scaleY(${short ? 0.5 : 1});`;
    };
    return {
      amOrPm,
      pick, pickerEvent,
      pickers, random,
      calcCircleStyle,
      currentTarget, changeTarget,
      currentHour, currentMinute, currentSecond,
      needleStyle
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
    width: 100%;
    height: 320px;
    border: 1px solid #ccc;
    border-radius: 3px;

    .oy-time-picker-am-pm {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }

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

      .oy-oy-time-picker-needle {
        background-color: #00bcd4;
        height: calc(50% - 4px);
        width: 2px;
        bottom: 50%;
        left: calc(50% - 1px);
        transform-origin: center bottom;
        position: absolute;
        will-change: transform;
        z-index: 1;
      }
    }

  }

}


</style>
