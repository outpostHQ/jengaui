module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['off'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['off']
  }
}
