module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['import', '@typescript-eslint'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    '@typescript-eslint/explicit-function-return-type': 2,
    'prettier/prettier': ['error', { semi: true }],
    'no-prototype-builtins': 'off',
    curly: ['error'],
    '@typescript-eslint/no-unused-vars': 'error',
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'import/order': [
      'warn',
      {
        groups: [
          'unknown',
          'external',
          'internal',
          'builtin',
          'index',
          'sibling',
          'parent',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    radix: 'error',
  },
  ignorePatterns: ['swagger'],
};
