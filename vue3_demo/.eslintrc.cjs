/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:prettier/recommended',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'vue/multi-word-component-names': 0,
    'no-undef': 0,
    semi: ['error', 'always'],
    'jsx-quotes': ['error', 'prefer-double'],
    quotes: [2, 'single'],
    // 'space-before-function-paren': [2, 'always'],
    'space-before-function-paren': 'off',
    'no-trailing-spaces': 2,
    'template-tag-spacing': 2,
    'arrow-spacing': 2,
    'rest-spread-spacing': 2,
    'no-multi-spaces': 2,
    'comma-spacing': 2,
    'semi-spacing': 2,
    'space-in-parens': 2,
    '@typescript-eslint/no-unused-vars': 0,
  },
};
