module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:vue/vue3-recommended'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true
    },
    requireConfigFile: false,
    parser: '@babel/eslint-parser'
  },
  plugins: [
    'vue'
  ],
  rules: {
    semi: [2, 'never'],
    'no-var': 'error',
    indent: ['error', 2],
    'no-unused-vars': 'off',
    'no-mixed-spaces-and-tabs': 'error',
    quotes: [2, 'single'],
    'vue/html-closing-bracket-newline': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 5 },
      multiline: { max: 5 }
    }],
    'vue/multi-word-component-names': 'off'
  }
}
