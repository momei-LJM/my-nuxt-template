// @ts-check
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
    '@typescript-eslint/no-explicit-any': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
  },
})
