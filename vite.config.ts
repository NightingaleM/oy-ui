// @ts-nocheck
import {md} from './plugins/md';
import fs from 'fs';
import {baseParse} from '@vue/compiler-core';

export default {
  plugins: [md()],
  vueCustomBlockTransforms: {
    demo: (options) => {
      const {code, path} = options;
      const file = fs.readFileSync(path).toString();
      const title_parsed = baseParse(file).children.find(n => n.tag === 'demo');
      const title = title_parsed?.loc.source.replace('<demo>', '').replace('</demo>', '');
      const main = file.split(title_parsed.loc.source).join('').trim();
      return `export default function (Component) {
        Component.__sourceCode = ${
        JSON.stringify(main)
      }
        Component.__sourceCodeTitle = ${JSON.stringify(title ?? '')}
      }`.trim();
    },
    testDemo:(options) => {
      const {code, path} = options;
      const file = fs.readFileSync(path).toString();
      const title_parsed = baseParse(file).children.find(n => n.tag === 'testDemo');
      const title = title_parsed?.loc.source.replace('<demo>', '').replace('</demo>', '');
      const main = file.split(title_parsed.loc.source).join('').trim();
      return `export default function (Component) {
        Component.__sourceCode = ${
        JSON.stringify(main)
      }
        Component.__sourceCodeTitle = ${JSON.stringify(title ?? '')}
      }`.trim();
    },
  }
};
// Component.__sourceCodeIntroduction = ${JSON.stringify(intro)}
