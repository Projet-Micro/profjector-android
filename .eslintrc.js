module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
        browser: true,
        amd : true,
      },
      files: [
        '.eslintrc.{js,cjs}',
        'babel.config.js',
        '/hooks/useFonts.js'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  rules: {
    'no-unused-vars': 'warn',
    'new-line-after-import': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-console': 'off',
    'func-names': 'off',
    'object-shorthand': 'off',
    'class-methods-use-this': 'off',
  },
};
