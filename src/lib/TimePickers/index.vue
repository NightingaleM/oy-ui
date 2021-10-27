<template>
  <div :class="['oy-time-picker',`oy-time-picker-key-${random}`,{'oy-time-picker-disabled': disabled}]"
       :style="{width:parseInt(`${width}`)+'px'}">
    <div class="oy-time-picker-header">
      <div v-if="format==='ampm'" class="oy-time-picker-header-ampm">
        <span
            :class="[{'oy-time-picker-header-ampm-active':amOrPm==='am'}]">
          AM
        </span>
        <span
            :class="[{'oy-time-picker-header-ampm-active':amOrPm==='pm'}]">
          PM
        </span>
      </div>
      <span :class="[{'oy-time-picker-currentTarget-active':currentTarget==='h'}]"
            @click="changeTarget('h')">{{ currentTime["h"] ?? '--' }}</span>
      <span class="oy-time-picker-dot">:</span>
      <span :class="[{'oy-time-picker-currentTarget-active':currentTarget==='m'}]" @click="changeTarget('m')">{{
          currentTime['m'] ? (currentTime['m'] >= 10 ? currentTime['m'] : '0' + +currentTime['m']) : '--'
        }}</span>
      <span v-if="useSeconds" class="oy-time-picker-dot">:</span>
      <span :class="[{'oy-time-picker-currentTarget-active':currentTarget==='s'}]" v-if="useSeconds"
            @click="changeTarget('s')">{{
          currentTime['s'] ? (+currentTime['s'] >= 10 ? +currentTime['s'] : '0' + +currentTime['s']) : '--'
              ?? '--'
        }}</span>
    </div>

    <div class="oy-time-picker-clock">
      <div class="oy-time-picker-am-pm" v-if="format==='ampm'">
        <span :class="[{'oy-time-picker-ampm-active': amOrPm==='am'}]"
              @click="setAMPM('am')">AM</span>
        <span :class="[{'oy-time-picker-ampm-active': amOrPm==='pm'}]"
              @click="setAMPM('pm')">PM</span>
      </div>
      <div class="oy-time-picker-click-panel-background" :style="format==='ampm' ? '':'margin-top: 34px;'">

        <div class="oy-time-picker-click-panel" @mousedown.capture="pickerEvent">
        <span class="oy-oy-time-picker-needle"
              :style="needleStyle"
        ></span>
          <template v-for="(picker,key) in pickers">
            <div v-show="currentTarget === key" :class="['oy-time-picker-item-box',`oy-time-picker-${key}-item-box`]">
              <span :class="['oy-time-picker-item',
            `oy-time-picker-item-${key}-${i.value}`,
            {'oy-time-picker-item-disabled': !i.enabled},
            {'oy-time-picker-item-visible': i.visible},
            {'oy-time-picker-item-active':i.active}
            ]"
                    v-for="i in picker" :key="i"
              >
              {{ i.visible ? i.value : '' }}
            </span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="oy-time-picker-disabled-module" v-if="disabled"></div>
  </div>
</template>
<script lang="ts">
import {computed, nextTick, onBeforeUpdate, onMounted, onUpdated, ref, watch, watchEffect} from 'vue';

export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
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
    const random = parseInt(`${Math.random() * 1000}`);
    const inputValueList = props.picker ? props.picker.split(':') : [null, null, null];
    const amOrPm = ref(inputValueList[0] >= 12 ? 'pm' : 'am');
    const currentTime = ref({
      h: inputValueList[0] >= 12 ? inputValueList[0] - 12 : inputValueList[0],
      m: inputValueList[1],
      s: inputValueList[2] ?? null
    });
    const timeType = ref(props.format === '24hr' ? 24 : 12); // 12 24
    const currentTarget = ref('h'); // h m s
    const PROPS_MAP = {
      h: props.allowedHours,
      m: props.allowedMinutes,
      s: props.allowedSeconds
    };
    const initPickerHandle = (type) => {
      const length = type === 'h' ? timeType.value : 60;
      const list = new Array(length).fill(0);
      return list.map((e, i) => {
        let enabled = true;
        const handle = PROPS_MAP[type];
        if (handle) {
          if (handle instanceof Function) enabled = !!handle(i);
          else enabled = handle.indexOf(i) >= 0;
        }
        return {
          value: i,
          visible: type !== 'h' ? !(i % 5) : true,
          enabled: enabled,
          active: false
        };
      });
    };
    const pickers = {
      h: initPickerHandle('h'),
      m: initPickerHandle('m'),
      s: initPickerHandle('s'),
    };
    const currentValue = computed(() => {
      const target = currentTarget.value;
      let value = currentTime.value[target];
      return value;
    });
    const panelDom = ref(null);
    const pickersActiveHandle = () => {
      for (const key in pickers) {
        const v = +currentTime.value[key];
        pickers[key].forEach(e => {
          e.active = e.value === v;
        });
      }
    };
    watchEffect(() => {
      let {h, m, s} = currentTime.value;
      pickersActiveHandle();
      h = props.format === '24hr' ? h : amOrPm.value === 'am' ? h : +h + 12;
      if (props.useSeconds && h && m && s) {
        const value = `${h}:${m >= 10 ? m : '0' + +m}:${s >= 10 ? s : '0' + +s}`;
        emit('update:picker', value);
      } else if (h && m) {
        const value = `${h}:${m >= 10 ? m : '0' + +m}`;
        emit('update:picker', value);
      }
    });
    watch([
      props
    ], () => {
      const {picker} = props;
      0;
      const inputValueList = picker ? picker.split(':') : [null, null, null];
      amOrPm.value = inputValueList[0] >= 12 ? 'pm' : 'am';
      currentTime.value.h = (inputValueList[0] >= 12 && props.format === 'ampm') ? +inputValueList[0] - 12 : +inputValueList[0];
      currentTime.value.m = +inputValueList[1];
      currentTime.value.s = +inputValueList[2] ?? null;
      moveNeedle(currentValue.value);
    });
    let needleAngle = 0;
    onMounted(() => {
      panelDom.value = document.querySelector(`.oy-time-picker-key-${random} .oy-time-picker-click-panel`);
      moveNeedle(currentValue.value);
      calcCircleStyle();
    });
    const setCurrentValue = (value, next?) => {
      const target = currentTarget.value;
      currentTime.value[target] = value;
      if (!next) return;
      const nextTarget = target === 's' ? 's' : (props.useSeconds && target === 'm') ? 's' : 'm';
      setTimeout(() => {
        changeTarget(nextTarget);
      }, 50);
    };
    const changeTarget = type => {
      if (props.disabled) return;
      currentTarget.value = type;
      moveNeedle(currentValue.value);
    };
    const moveNeedle = value => {
      const l = pickers[currentTarget.value].length;
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
    const calcCircleStyle = (initiative = false) => {
      const map = ['h', 'm', 's'];
      for (let i = 0; i < 3; i++) {
        const items = document.querySelectorAll(`.oy-time-picker-key-${random} .oy-time-picker-${map[i]}-item-box .oy-time-picker-item`);
        const l = pickers[map[i]].length;
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          let p1, p2;
          if (l === 24) {
            const angle = 360 / (l / 2);
            p1 = [0, 0];
            p2 = [];
            if (i > 11) {
              p2[0] = p1[0] + 25 * Math.cos(angle * (i - 12) * Math.PI / 180) + 50;
              p2[1] = p1[1] + 25 * Math.sin(angle * (i - 12) * Math.PI / 180) + 50;
            } else {
              p2[0] = p1[0] + 50 * Math.cos(angle * i * Math.PI / 180) + 50;
              p2[1] = p1[1] + 50 * Math.sin(angle * i * Math.PI / 180) + 50;
            }
          } else {
            const angle = 360 / l;
            p1 = [0, 0];
            p2 = [];
            p2[0] = p1[0] + 50 * Math.cos(angle * i * Math.PI / 180) + 50;
            p2[1] = p1[1] + 50 * Math.sin(angle * i * Math.PI / 180) + 50;
          }
          item.style.bottom = `${p2[0]}%`;
          item.style.left = `${p2[1]}%`;
        }
      }
    };
    const pickerMoveEvent = ($event) => {
      if (props.disabled) return;
      const panel = panelDom.value;
      pickerEventHandle($event);
    };
    const pickerUpEvent = ($event) => {
      if (props.disabled) return;
      const panel = panelDom.value;
      pickerEventHandle($event, true);
      removeEventList();
    };
    const removeEventList = () => {
      if (props.disabled) return;
      const panel = panelDom.value;
      panel.removeEventListener('mousemove', pickerMoveEvent, true);
      panel.removeEventListener('mouseup', pickerUpEvent, true);
    };
    const pickerEvent = ($event) => {
      if (props.disabled) return;
      const panel = panelDom.value;
      panel.addEventListener('mousemove', pickerMoveEvent, true);
      panel.addEventListener('mouseup', pickerUpEvent, true);
    };
    const needleStyle = ref('transform: rotate(0deg);');
    const pickerEventHandle = ($event, next?) => {
      if (props.disabled) return;
      const panel = panelDom.value;
      const target = $event.target;
      let X = $event.offsetX;
      let Y = $event.offsetY;
      if (target !== panel && ([...target.classList].indexOf('oy-time-picker-item') >= 0)) {
        console.log(target.offsetLeft, target.offsetTop);
        X = X + target.offsetLeft;
        Y = Y + target.offsetTop;
      } else if ([...target.classList].indexOf('oy-oy-time-picker-needle') >= 0) {
        const x_ = +getComputedStyle(target).height.replace('px', '');
        X = R + Math.sin(needleAngle * Math.PI / 180) * x_;
        const YDenominator = Math.tan(needleAngle * Math.PI / 180);
        Y = YDenominator ? (R * Math.tan(needleAngle * Math.PI / 180) - Math.sin(needleAngle * Math.PI / 180) * x_) / YDenominator : Y;
      }
      if (X % 2) X += 1;
      if (Y % 2) Y += 1;
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
      const l = pickers[currentTarget.value].length;
      if (l !== 24) {
        const cellAngle = 360 / l;
        let i = (angle + cellAngle / 2) / cellAngle;
        i = +parseInt(i.toString());
        if (i === l) i = 0;
        if (!pickers[currentTarget.value][i].enabled) return;
        setCurrentValue(i, next);
        setNeedleStyle(i * cellAngle);
      } else {
        const distance = (X - R) ? Math.abs((X - R)) / Math.sin(angle * (Math.PI / 180)) : Y;
        const cellAngle = 360 / (l / 2);
        let m = (angle + cellAngle / 2);
        m = m > 360 ? m - 360 : m;
        let i = (m) / cellAngle;
        i = distance < 67 ? +i + 12 : i;
        i = +parseInt(i.toString());
        if (i === l) i = 0;
        if (!pickers[currentTarget.value][i].enabled) return;
        if (i === 0) console.log('Y:', Y, ',X:', X, ',distance:', distance, ',R:', R, ',angle:', angle);
        if (i === 12) console.log('Y:', Y, ',X:', X, ',distance:', distance, ',R:', R, ',angle:', angle);
        setCurrentValue(i, false);
        // TODO
        // setCurrentValue(i, next);
        setNeedleStyle(((i > 11 ? i - 12 : i) * cellAngle), i >= 12);
      }
    };
    const setNeedleStyle = (angle, short?) => {
      needleAngle = angle;
      needleStyle.value = `transform: rotate(${angle}deg); height: ${short ? 'calc(25% - 6px)' : 'calc(50% - 6px)'};`;
      // needleStyle.value = `transform: rotate(${angle}deg) scaleY(${short ? 0.5 : 1});`;
    };
    const setAMPM = type => {
      if (props.disabled) return;
      amOrPm.value = type;
    };
    return {
      setAMPM,
      amOrPm,
      pickerEvent,
      pickers, random,
      calcCircleStyle,
      currentTarget, changeTarget,
      currentTime,
      needleStyle
    };
  }
};
</script>
<style lang="scss">
.oy-time-picker {
  .oy-time-picker-header {
    border-radius: 4px 4px 0px 0px;
    background-color: #5db1e8;
    font-size: 32px;
    padding: 10px 20px;
    font-weight: bolder;
    color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: end;
    align-items: center;

    .oy-time-picker-dot {
      font-size: 32px;
      margin: 0 5px;
    }

    .oy-time-picker-header-ampm {
      display: flex;
      flex-direction: column;
      margin-right: 8px;

      span {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
      }

      .oy-time-picker-header-ampm-active {
        color: #fff
      }
    }

    .oy-time-picker-currentTarget-active {
      color: #fff;
      font-size: 32px;
    }
  }

  .oy-time-picker-clock {
    position: relative;
    width: 100%;
    height: 320px;
    border: 1px solid #ccc;
    border-radius: 0px 0px 4px 4px;

    .oy-time-picker-am-pm {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding: 5px 25px;

      span {
        color: #ccc;
        cursor: pointer;

        &:hover {
          color: #00cde7;
        }
      }

      .oy-time-picker-ampm-active {
        color: #5db1e8;
      }
    }

    .oy-time-picker-click-panel-background {
      border-radius: 50%;
      background-color: #eee;
      width: 230px;
      height: 230px;
      margin: 0 auto;
      position: relative;

      .oy-time-picker-click-panel {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 200px;
        height: 200px;

        .oy-time-picker-item-box {
          width: 100%;
          height: 100%;

          span {
            display: block;
          }
        }

        .oy-time-picker-item {
          position: absolute;
          user-select: none;
          color: #999;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          transform: translate(-50%, 50%);
        }


        .oy-time-picker-item-visible {
          font-size: 14px;
          color: #999;
          //padding: 5px;
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 19px;
        }

        .oy-time-picker-item-active {
          border: 1px solid #5db1e8;
          background-color: #5db1e8;
          color: #fff;
        }

        .oy-time-picker-item-disabled {
          color: #ccc;
          background-color: #eee;
        }


        .oy-oy-time-picker-needle {
          background-color: #5db1e8;
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

}

.oy-time-picker-disabled {
  position: relative;
  //.oy-time-picker-header{
  //  background-color: #001a35;
  //  span {
  //    color:#ccc !important;
  //  }
  //}
  .oy-time-picker-disabled-module {
    cursor: not-allowed !important;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
  }
}


</style>
