// import babel from '@rollup/plugin-babel'
// import { nodeResolve } from '@rollup/plugin-node-resolve'
import path from 'path'
import vue from 'rollup-plugin-vue'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import {babel} from '@rollup/plugin-babel'
//import typescript from "rollup-plugin-typescript2"
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle"
const json = require("@rollup/plugin-json"); // json解析
import cjs from '@rollup/plugin-commonjs'
import rollupAlias from '@rollup/plugin-alias'
import url from '@rollup/plugin-url'
import copy from 'rollup-plugin-copy'
// https://www.npmjs.com/package/@sixian/css-url
import { cssUrl } from '@sixian/css-url'
// import replace from '@rollup/plugin-replace'
//import css from 'rollup-plugin-css-only'
// import CleanCSS from 'clean-css'
import fs from 'fs'
import postcss from 'rollup-plugin-postcss';
const cssnano = require("cssnano");
const autoprefixer = require("autoprefixer");  // 浏览器前缀

const config = require('../package.json')

const { name } = config
const file = type => `lib/${name}.${type}.js`

export { name, file }

export const createBabelHelper = function () {
  return babel({
    exclude: 'node_modules/**',
    // 移除 @vue/babel-preset-jsx (Vue2)
    // 如果不需要 JSX，presets 可以为空；如果需要，使用下面的 plugins
    plugins: [
      '@vue/babel-plugin-jsx', // Vue 3 专用
      '@babel/plugin-transform-runtime'
    ],
    babelHelpers: 'runtime',
    extensions: ['.js', '.jsx', '.vue'] 
  })
}

let overrides = { 
  compilerOptions: { declaration: true },
  exclude: [
    "node_modules",
    "src/App.vue",
    "src/main.ts"
  ]
}
const external = [
  //外部库， 使用'umd'文件时需要先引入这个外部库
  'vue', // !标记为通过script引入，打包的时候不用打包 这个模块
  'axios',
  'lodash-es',
  "element-plus"
];

const customResolver = nodeResolve({
  extensions: ['.js', '.jsx', '.vue']
})


export default {
  input: 'packages/index.js',
  output: {
    name,
    file: file('esm'),
    format: 'esm',
    globals: {
      "vue": "Vue",
      'element-ui': 'ELEMENT',
      'lodash-es': '_'
    },
    inlineDynamicImports: true, // 必须开启
  },
  external,
  plugins: [
    json(),
    rollupAlias({
      entries: [
        // {
        //   find: '@ylSrc',
        //   replacement: path.resolve(__dirname, '../src')
        // },
        // {
        //   find: '@ylPackages',
        //   replacement: path.resolve(__dirname, '../packages')
        // },
        { 
          find: '@', 
          replacement: path.resolve(__dirname, '../src') // 确保指向正确的 src 目录
        }
      ],
      customResolver
    }),
    
    // 关键！在这里配置 extensions，让 Rollup 自动补全 .vue 后缀
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'], // ← 添加 .vue
      preferBuiltins: false, // 避免 Node 内置模块冲突
      mainFields: ['module', 'jsnext:main', 'browser', 'main'] // 优先 ESM
    }),

    url({
      include: ['**/*.svg'],
      limit: 10240, // 10kb
      publicPath: './assets/',
      destDir: 'lib/assets'
    }),
    copy({
      targets: [
        { 
          src: 'src/assets/**/*', 
          dest: 'lib/assets' 
        },
        // 复制 Photoswipe 的皮肤图片（重点！）
        {
          src: 'node_modules/photoswipe/dist/default-skin/default-skin.svg',  // 匹配 png/svg 等
          dest: 'lib/',  // 输出到 lib/assets/photoswipe
          flatten: false
        },
      ]
    }),

    excludeDependenciesFromBundle({
      peerDependencies: true,
      dependencies: false
    }),

    postcss({
      extensions: ['.css', '.scss'],
      plugins: [
        cssUrl({
          imgOutput: 'lib/assets/images/',
          fontOutput: 'lib/assets/font/',
          cssOutput: 'lib/',
          hash: false,
          slash: false,
          limit: 1024
        }),
        cssnano(),
        autoprefixer({ overrideBrowserslist: ['> 0.15% in CN'] })
      ],
      // 可选：提取所有样式到一个文件
      extract: `index.css`
    }),

    vue({
      css: false, // 关闭 vue 自带 css 处理，交给 postcss
      compileTemplate: true
    }),
    createBabelHelper(),

    cjs(),
  ]
}