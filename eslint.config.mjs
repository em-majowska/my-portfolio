import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
];

module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true, // Supports ES6+ syntax (including async/await, etc.)
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest', // Allows modern JavaScript
    sourceType: 'module', // Enables ES module syntax (import/export)
  },
  rules: {
    'no-var': 'error', // Prefer let/const over var
    'prefer-const': 'warn', // Suggest const where possible
    eqeqeq: 'error', // Require strict equality (===)
    'no-unused-vars': 'warn', // Warn about unused variables
  },
};
