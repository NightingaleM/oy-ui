const waveHandle = function ($ref) {
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
    span.style.left = downEvent.offsetX + 'px';
    span.style.top = downEvent.offsetY + 'px';
    $ref.value.append(span);
    $ref.value.addEventListener('mouseup', mouseUpHandel, {once: true});
  };
  $ref.value.addEventListener('mousedown', downHandle);
};

export default waveHandle
