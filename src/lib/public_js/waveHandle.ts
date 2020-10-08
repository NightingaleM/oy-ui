/**
 *
 * @param $ref 一个ref<HTMLElement>
 * @returns {{remove: remove}}
 *
 * 返回一个对象，对象里remove函数用于去除 之前元素的监听
 */
const waveHandle = function ($ref) {
  console.log('waveHandle 有跑，ref为：', $ref);
  const downHandle = downEvent => {
    if ([...downEvent.path[0].classList].indexOf('oy-wave') >= 0) {
      return;
    }
    ;
    let st = new Date().getTime();
    const mouseUpHandel = (upEvent) => {
      let et = new Date().getTime();
      let delay = 0;
      if (et - st < 300) {
        delay = 300 - (et - st);
      }
      setTimeout(() => {
        span.className += ' oy-wave-remove';
        setTimeout(() => {
          try {
            $ref.value.removeChild(span);
          } catch (e) {
            // 考虑到可能出现点击后元素立马消失情况。
          }
        }, 150);
      }, delay);
      // $ref.value.removeEventListener('mouseup', mouseUpHandel);
    };

    let span = document.createElement('span');
    span.className = 'oy-wave';
    span.style.position = 'absolute';
    span.style.left = downEvent.layerX + 'px';
    span.style.top = downEvent.layerY + 'px';
    $ref.value.append(span);
    $ref.value.addEventListener('mouseup', mouseUpHandel, {once: true});
  };
  $ref.value.addEventListener('mousedown', downHandle);

  const remove = () => {
    $ref.value.removeEventListener('mousedown', downHandle);
  };
  return {
    remove
  };
};

export default waveHandle;
