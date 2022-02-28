module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'import/no-unresolved': 'off', // alias
    'react/prop-types': 'off', // typescript
    'react/no-children-prop': 'warn',
    'react/no-unescaped-entities': ['error', { forbid: ['>', '"', '}'] }],
    'react/display-name': 'warn',
    'react-hooks/exhaustive-deps': 'warn', // todo
    'react-hooks/rules-of-hooks': 'warn', // todo
    '@typescript-eslint/indent': 'off', // prettier
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'simple-import-sort/sort': [
      'error',
      {
        groups: [['^react(-dom)?$'], ['^@?\\w'], ['^src/'], ['^\\.\\./', '^\\./']],
      },
    ],
  },
};
