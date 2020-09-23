import Dialog from './Dialog.vue';
import {createApp, h} from 'vue';

export const OpenDialog = (options) => {
  const {title, content} = options;
  const div = document.createElement('div');
  document.body.appendChild(div);
  const close = () => {
    app.unmount(div);
    div.remove();
  };
  let app = createApp({
    render() {
      return h(Dialog, {
        visible: true,
        'onUpdate:visible': (value) => {
          console.log(value);
          if (value === false) close();
        }
      }, {
        title, content
      });
    }
  });
  app.mount(div);
};
