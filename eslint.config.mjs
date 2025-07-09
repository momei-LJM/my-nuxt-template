// @ts-check
// @ts-ignore
import plugin from '@momei-x/stubborn-eslint-rules'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'no-console': 'off',
    'vue/block-order': 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false,
      },
    ],
    'vue/no-mutating-props': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-this-alias': 'off', // components : 组件复用，会有选项式api用法 - 允许this
    '@typescript-eslint/no-unused-expressions': 'off', // 允许使用三元表达式
    '@typescript-eslint/no-explicit-any': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
  },

},
{
  files: ['**/*.vue'],
  plugins: {
    stubborn: plugin,
  },
  rules: {
    'stubborn/filename-case': [
      'error',
      'kebab',
    ],
  },
},
{
  files: ['**/*.{js,ts,jsx,tsx,vue}'],
  plugins: {
    stubborn: plugin,
  },
  rules: {
    'stubborn/no-localstorage': [
      'error',
      {
        msg: '请使用 ~/storage 模块替代直接使用 localStorage',
      },
    ],
  },
}, {
  files: ['src/storage/**/*.{js,ts,jsx,tsx,vue}'],
  plugins: {
    stubborn: plugin,
  },
  rules: {
    'stubborn/no-localstorage': 'off',
  },
})
