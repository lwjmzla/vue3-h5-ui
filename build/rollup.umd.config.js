import basicConfig, { name, file } from './rollup.config'
import vue from 'rollup-plugin-vue'

//basicConfig.plugins.push(vue({ css: false, template: { optimizeSSR: true } }))

export default {
  ...basicConfig,
  output: {
    name,
    file: file('umd'),
    format: 'umd',
    inlineDynamicImports: true, // 必须开启
    globals: {
      "vue": "Vue",
      'element-ui': 'ELEMENT',
      'lodash-es': '_'
    },
    exports: 'named' // !解决Mixing named and default exports
  }
}