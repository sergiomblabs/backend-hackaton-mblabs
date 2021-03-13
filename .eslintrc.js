module.exports = {
  env: {
    es6: true,
    node: true,
    jasmine: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:jasmine/recommended', 'plugin:jsdoc/recommended'],
  plugins: ['prettier', 'jasmine', 'jsdoc'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next', ignoreRestSiblings: true }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.spec.js', '/spec/**'] }],
    'jsdoc/require-returns-type': 0,
    'jsdoc/no-undefined-types': 0,
  },
};
