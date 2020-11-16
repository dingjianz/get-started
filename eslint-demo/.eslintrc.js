module.exports = {
  "parser": "babel-eslint",
  "env": {
      "browser": true,
      "es6": true
  },
  "extends": ["airbnb", "plugin:prettier/recommended"],
  "globals": {
      "Atomics": "readonly",
      "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
      "ecmaVersion": 2018,
      "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": "error",
    "no-unused-vars": "off",
    "prettier/prettier": "error",
  }
};