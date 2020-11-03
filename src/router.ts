import {createWebHashHistory, createRouter} from 'vue-router';
import {h} from 'vue';
import Home from './views/Home.vue';
import Doc from './views/Doc.vue';
import SwitchDemo from './components/SwitchDemo.vue';
import ButtonDemo from './components/ButtonDemo.vue';
import DialogDemo from './components/DialogDemo.vue';
import TabsDemo from './components/TabsDemo.vue';
import DocDemo from './components/DocDemo.vue';
import Markdown from './components/Markdown.vue';

import intro from './md/intro.md';
import install from './md/install.md';
import getStart from './md/get-start.md';

// const md = path => h(Markdown, {key: path, path: `../md/${path}.md`});
const md = string => h(Markdown, {content: string, key: string});
const history = createWebHashHistory();
export const router = createRouter({
  history: history,
  routes: [
    {path: '/', component: Home},
    {
      path: '/doc',
      component: Doc,
      children: [
        {path: '', component: DocDemo},
        {path: 'intro', component: md(intro)},
        {path: 'get-start', component: md(getStart)},
        {path: 'install', component: md(install)},
        {path: 'switch', component: SwitchDemo},
        {path: 'button', component: ButtonDemo},
        {path: 'dialog', component: DialogDemo},
        {path: 'tabs', component: TabsDemo},
      ],
    },
  ],
});
router.afterEach(() => {
  // console.log('路由切换了');
});
