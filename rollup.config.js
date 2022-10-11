import esbuild from 'rollup-plugin-esbuild'
import vue from 'rollup-plugin-vue'
// import scss from 'rollup-plugin-scss'
// import dartSass from 'sass';
import {terser} from "rollup-plugin-terser"

console.log('run~')
const scss = require('rollup-plugin-scss')
const dartSass = require('sass')
export default {
  input: 'src/lib/index.ts',
  output: [{
    globals: {
      vue: 'Vue'
    },
    name: 'oy_ui',
    file: 'dist/lib/oy_ui.js',
    format: 'umd',
    plugins: [terser()]
  }, {
    name: 'oy_ui',
    file: 'dist/lib/oy_ui.esm.js',
    format: 'es',
    plugins: [terser()]
  }],
  plugins: [
    scss({include: /\.scss$/, sass: dartSass}),
    vue({
      include: /\.vue$/,
    }),
    esbuild({
      include: /\.[jt]s$/,
      minify: process.env.NODE_ENV === 'production',
      target: 'es2015'
    })
  ],
}
