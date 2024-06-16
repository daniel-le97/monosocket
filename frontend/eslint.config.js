import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  css: true,
  rules: {
    'no-console': 'off',
    'node/prefer-global/process': 'off',
    'no-unused-vars': 'off',
    'ts/no-unused-vars': 'off',
    'unused-imports/no-unused-vars': 'off',
    'node/prefer-global/buffer': 'off',
    'unicorn/prefer-node-protocol': 'off',
  },
})
