import {createWebHashHistory, createRouter} from 'vue-router';
import {h} from 'vue';
import Home from './views/Home.vue';
import Doc from './views/Doc.vue';
import SwitchDemo from './components/SwitchDemo.vue';
import ButtonDemo from './components/ButtonDemo.vue';
import DialogDemo from './components/DialogDemo.vue';
import CollapseDemo from './components/CollapseDemo.vue';
import TabsDemo from './components/TabsDemo.vue';
import TreeViewDemo from './components/TreeViewDemo.vue';
import PaginationDemo from './components/PaginationDemo.vue';
import TransferDemo from './components/TransferDemo.vue';
import CheckboxDemo from './components/CheckboxDemo.vue';
import LazyDemo from './components/LazyDemo.vue';
import TimePickerDemo from './components/TimePickersDemo.vue';

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
        {path: 'intro', component: md(intro)},
        {path: 'get-start', component: md(getStart)},
        {path: 'install', component: md(install)},
        {path: 'switch', component: SwitchDemo},
        {path: 'checkbox', component: CheckboxDemo},
        {path: 'button', component: ButtonDemo},
        {path: 'dialog', component: DialogDemo},
        {path: 'tabs', component: TabsDemo},
        {path: 'collapse', component: CollapseDemo},
        {path: 'TreeView', component: TreeViewDemo},
        {path: 'pagination', component: PaginationDemo},
        {path: 'transfer', component: TransferDemo},
        {path: 'lazy', component: LazyDemo},
        {path: 'timepickers', component: TimePickerDemo}
      ],
    },
  ],
});
router.afterEach(() => {
  // console.log('路由切换了');
});
