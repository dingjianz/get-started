module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'prettier/prettier': 'error',
    'func-names': 0,
    'no-underscore-dangle': 0,
    'no-unused-vars': [2, { args: 'none' }],
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-unresolved': 0,
    'prefer-promise-reject-errors': 0,
    'prefer-destructuring': 0,
    'react/prop-types': 0,
    'react/state-in-constructor': [1, 'never'],
    'jsx-a11y/alt-text': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-unused-expressions': [
      2,
      { allowShortCircuit: true, allowTernary: true },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 0 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};
