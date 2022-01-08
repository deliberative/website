module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: false,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    ecmaVersion: 2021,
    sourceType: 'module',
    extraFileExtensions: ['.svelte'],
  },
  overrides: [
    {
      files: ['src/**/*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  plugins: ['eslint-plugin-jsdoc', 'eslint-plugin-prefer-arrow', 'svelte3', '@typescript-eslint'],
  settings: {
    'svelte3/typescript': true,
    'svelte3/ignore-styles': () => true,
  },
  rules: {
    'import/first': 0,
    'import/no-duplicates': 0,
    'import/no-mutable-exports': 0,
    'no-multiple-empty-lines': 0,
  },
};
