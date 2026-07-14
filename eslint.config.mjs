import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['node_modules', 'public', '.cache', '*.js'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  prettier,
  {
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // components take flexible children/props; tighten later if desired
      'react/prop-types': 'off',
    },
  }
);
