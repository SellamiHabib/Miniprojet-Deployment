import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
];
