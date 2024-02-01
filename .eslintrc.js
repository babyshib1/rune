module.exports = {
  env: {
    'browser': true,
    'es2021': true,
    'node': true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/essential'
  ],
  parserOptions: {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  globals: { wx: true, TencentCaptcha: true },
  plugins: [
    'vue'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unreachable': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'require-await': 'error', // 禁止使用不带 await 表达式的 async 函数
    'eqeqeq': ['error', 'always'], // 强制使用===或!==
    'no-eval': 'warn',
    'no-undef': 'warn',
    'no-empty': 'warn',
    'no-param-reassign': 'error',
    'no-sequences': 'error',
    'strict': ['error', 'global'], // 全局使用严格模式
    'semi': ['error', 'never'], // 末尾不允许分号
    'comma-dangle': ['error', 'never'], // 对象等最后一个键值对后面不允许加逗号
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs'],
    'no-multiple-empty-lines': ['error', {
      'max': 2, // 最大连续空行 2
      'maxEOF': 1, // 文件末尾最多1行
      'maxBOF': 0 // 文件开始不允许有空行
    }],
    'no-unused-vars': [
      'error',
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      { varsIgnorePattern: '.*', args: 'none' }
    ],
    'vue/multi-word-component-names': 0,
    'vue/no-v-model-argument': 0
  }
}
