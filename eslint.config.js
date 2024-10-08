/* eslint-disable import/no-extraneous-dependencies */
import { fixupConfigRules } from '@eslint/compat';
import globals from 'globals';
import babelParser from '@babel/eslint-parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'airbnb-base',
      'prettier',
    ),
  ),
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },

      parser: babelParser,
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        requireConfigFile: false,

        babelOptions: {
          presets: ['@babel/preset-env'],
        },
      },
    },
    rules: {
      'no-console': 'off',
      'class-methods-use-this': 'off',
      'import/prefer-default-export': 'off',
      'no-underscore-dangle': 'off',
      'import/extensions': 'off',
    },
  },
];
