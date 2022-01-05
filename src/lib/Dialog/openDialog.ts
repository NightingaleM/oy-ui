import Dialog from './Dialog.vue';
import {createApp, h} from 'vue';

export const OpenDialog = (options) => {
  const {title, content} = options;
  const div = document.createElement('div');
  document.body.appendChild(div);
  const close = () => {
    setTimeout(() => {
      app.unmount();
      // app.unmount(div);
      div.remove();
    }, 500);
  };
  let app = createApp({
    render() {
      return h(Dialog, {
        visible: true,
        byFunction: true,
        'onUpdate:visible': (value) => {
          if (value === false) close();
        }
      }, {
        title, content
      });
    }
  });
  app.mount(div, true);
};
