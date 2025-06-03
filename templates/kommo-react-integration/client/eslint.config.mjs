import eslint from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintReact from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import onlyVar from 'eslint-plugin-only-var';
import stylistic from '@stylistic/eslint-plugin';
import jsdoc from 'eslint-plugin-jsdoc';
import importPlugin from 'eslint-plugin-import';
import hooksPlugin from 'eslint-plugin-react-hooks';
import postCssModules from 'eslint-plugin-postcss-modules';

/** @type {import{"eslint"}.Linter.FlatConfig[]} */
export default tseslint.config(
  ...tseslint.configs.recommended,
  eslint.configs.recommended,
  eslintReact.configs.flat.recommended,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      '@stylistic': stylistic,
      'only-var': onlyVar,
      'prettier': prettierPlugin,
      'react': eslintReact,
      'jsdoc': jsdoc,
      'import': importPlugin,
      'react-hooks': hooksPlugin,
      'postcss-modules': postCssModules,
    },
  },
  {
    ignores: [
      'dist',
      '.swc',
      'storybook-static',
      'playwright/.cache',
      'coverage',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.amd,
        ...globals.browser,
        ...globals.node,
        Promise: false,
        exports: false,
        Set: false,
        Map: false,
        WeakSet: false,
        WeakMap: false,
        React: true,
        NodeJS: true,
        JQueryXHR: true,
        JSONValue: true,
      },
      parserOptions: {
        ...eslintReact.configs.recommended.parserOptions,
      },
    },
  },
  {
    files: ['**/*.{js,ts,tsx,jsx}'],
    settings: {
      'postcss-modules': {
        include: '**/*.module.css',
      },
    },
    rules: {
      ...eslintConfigPrettier.rules,
      'postcss-modules/no-undef-class': 'error',
      'postcss-modules/no-unused-class': 'error',

      'prettier/prettier': 'error',

      /**
       * We disable these rules and use analogues via the ts plugin
       */
      'no-unused-vars': 0,
      'no-use-before-define': 0,

      '@typescript-eslint/no-var-requires': 0,
      'no-continue': 0,
      '@typescript-eslint/no-this-alias': 0,
      'no-redeclare': 0,
      'no-undef': 0,

      /**
       * Errors notifications
       */

      'no-unreachable': 2,
      'array-callback-return': 2,
      'curly': 2,
      'dot-location': [2, 'property'],
      'dot-notation': 2,
      'eqeqeq': [2, 'smart'],
      'no-alert': 2,
      'no-caller': 2,
      'no-console': [
        2,
        {
          allow: ['error', 'warn'],
        },
      ],
      'no-else-return': 2,
      'no-empty-function': 2,
      'no-eq-null': 2,
      'no-eval': 2,
      'no-extend-native': [
        2,
        {
          exceptions: ['Object'],
        },
      ],
      'no-extra-bind': 2,
      'no-labels': 2,
      'no-extra-label': 2,
      'no-fallthrough': [2, { allowEmptyCase: true }],
      'no-floating-decimal': 2,
      'no-implied-eval': 2,
      'no-lone-blocks': 2,
      'no-loop-func': 2,
      'no-multi-spaces': 2,
      'no-multi-str': 2,
      'no-new-func': 2,
      'no-new-wrappers': 2,
      'no-proto': 2,
      'no-script-url': 2,
      'no-self-compare': 2,
      'no-sequences': 2,
      'no-throw-literal': 2,
      'no-unused-expressions': 2,
      'no-useless-call': 2,
      'no-useless-concat': 2,
      'no-useless-escape': 2,
      'no-useless-return': 2,
      'radix': [2, 'as-needed'],
      'wrap-iife': [2, 'inside'],
      'yoda': [2, 'never'],
      '@typescript-eslint/no-shadow': [2, { allow: ['require'] }],
      'no-shadow-restricted-names': 2,
      'no-undef-init': 2,
      'no-constant-binary-expression': 2,
      '@typescript-eslint/no-use-before-define': 2,
      '@typescript-eslint/no-unused-vars': [
        2,
        {
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-redeclare': 2,
      'prefer-const': 2,
      'no-var': 2,
      'consistent-this': [2, 'self', 'modal_ctx'],
      'func-name-matching': [2, 'always'],
      'no-bitwise': 2,
      'no-lonely-if': 2,
      'no-negated-condition': 2,
      'no-new-object': 2,
      'no-nested-ternary': 2,
      'no-unneeded-ternary': 2,
      'no-case-declarations': 2,

      // Stylistic Issues

      'brace-style': [
        2,
        '1tbs',
        {
          allowSingleLine: true,
        },
      ],
      'block-spacing': 2,
      'comma-dangle': [2, 'only-multiline'],
      '@stylistic/comma-spacing': 2,
      '@stylistic/comma-style': 2,
      '@stylistic/computed-property-spacing': 2,
      // 'func-call-spacing': 2, // disabled because it is managed in prettier
      'id-length': [
        2,
        {
          min: 1,
          max: 50,
          properties: 'always',
        },
      ],
      '@stylistic/key-spacing': 2,
      '@stylistic/keyword-spacing': 2,
      '@stylistic/linebreak-style': [2, 'unix'],
      'max-depth': [
        2,
        {
          max: 4,
        },
      ],
      'max-len': [
        2,
        {
          code: 120,
          comments: 90,
          ignoreStrings: true,
          ignoreRegExpLiterals: true,
          ignoreTemplateLiterals: true,
          ignoreUrls: true,
        },
      ],
      'max-nested-callbacks': [
        2,
        {
          max: 3,
        },
      ],
      'max-params': [
        2,
        {
          max: 4,
        },
      ],
      'max-statements-per-line': [
        2,
        {
          max: 2,
        },
      ],
      'new-cap': [
        2,
        {
          capIsNewExceptions: ['Deferred', 'QStoJSON'],
          capIsNewExceptionPattern: '^url_params\\..',
        },
      ],
      'new-parens': 2,
      '@typescript-eslint/no-array-constructor': 2,
      '@stylistic/no-mixed-spaces-and-tabs': 2,
      '@stylistic/no-multiple-empty-lines': 2,
      'no-tabs': 2,
      '@stylistic/no-trailing-spaces': 2,
      '@stylistic/no-whitespace-before-property': 2,
      '@stylistic/object-curly-spacing': [2, 'always'],
      '@stylistic/one-var-declaration-per-line': [2, 'initializations'],
      'operator-assignment': 2,
      '@stylistic/operator-linebreak': [
        2,
        'after',
        {
          overrides: {
            '?': 'before',
            ':': 'before',
          },
        },
      ],
      '@stylistic/padded-blocks': [2, 'never'],
      '@stylistic/padding-line-between-statements': [
        2,
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: '*',
        },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        {
          blankLine: 'always',
          prev: 'directive',
          next: '*',
        },
        {
          blankLine: 'any',
          prev: 'directive',
          next: 'directive',
        },
        {
          blankLine: 'always',
          prev: 'block-like',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: 'multiline-block-like',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'multiline-block-like',
        },
        {
          blankLine: 'always',
          prev: ['break', 'return'],
          next: ['case', 'default'],
        },
      ],
      '@stylistic/quote-props': [2, 'consistent'],
      '@stylistic/quotes': [
        2,
        'single',
        {
          avoidEscape: true,
        },
      ],
      '@stylistic/semi': 2,
      '@stylistic/semi-spacing': 2,
      '@stylistic/semi-style': [2, 'last'],
      '@stylistic/space-before-blocks': 2,
      // '@stylistic/space-in-parens': 2, // disabled because it is managed in prettier
      '@stylistic/space-infix-ops': 2,
      '@stylistic/space-unary-ops': [
        2,
        {
          words: true,
          nonwords: false,
        },
      ],
      '@stylistic/spaced-comment': [
        2,
        'always',
        {
          block: {
            balanced: true,
          },
        },
      ],
      '@stylistic/switch-colon-spacing': 2,
      'unicode-bom': [2, 'never'],
      // 'camelcase': [
      //   2,
      //   {
      //     ignoreDestructuring: true,
      //     properties: 'never',
      //     allow: ['lang_id'],
      //   },
      // ],
      'no-constant-condition': [2, { checkLoops: false }],

      /**
       * Warns notifications
       */

      'no-restricted-syntax': [
        // highlighting the console.warn and console.error
        'warn',
        {
          selector:
            'CallExpression[callee.object.name="console"][callee.property.name="error"]',
          message: 'Use of console.error is discouraged',
        },
        {
          selector:
            'CallExpression[callee.object.name="console"][callee.property.name="warn"]',
          message: 'Use of console.warn is discouraged',
        },
      ],
      '@typescript-eslint/no-explicit-any': 1,

      /* REACT */

      'react/prop-types': 0,
      'react/react-in-jsx-scope': 0,
      'react/jsx-handler-names': [
        2,
        {
          checkLocalVariables: true,
          /**
           * on - for methods from props
           * handle - for local methods
           *
           * P.S. the description above is a concept,
           * in fact, the plugin does not understand,
           * where did it come from the props, and where is it locally,
           * because if you do destructuring,
           * then the method from the props becomes local.
           */
          eventHandlerPrefix: 'on|handle',
        },
      ],
      'react/hook-use-state': 2,
      'react/boolean-prop-naming': [
        2,
        { rule: '^(are|is|have|has|should|must|with)[A-Z]([A-Za-z0-9]?)+' },
      ],
    },
  },

  /* IMPORTS */

  {
    files: ['**/*.{ts,tsx}'],
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      'import/no-unresolved': 2,
      'import/order': [
        2,
        {
          'groups': [
            'object',
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],

          'pathGroups': [
            { pattern: 'vendor/**', group: 'external', position: 'after' },

            { pattern: '@ui/**', group: 'external', position: 'after' },

            { pattern: '@api/**', group: 'internal', position: 'after' },

            {
              pattern: '@hoc/**',
              group: 'internal',
              position: 'after',
            },

            { pattern: '@utils/**', group: 'internal', position: 'after' },
            
            { pattern: '@hooks/**', group: 'internal', position: 'after' },

            {
              pattern: '@components/**',
              group: 'internal',
              position: 'after',
            },

            {
              pattern: '@pages/**',
              group: 'internal',
              position: 'after',
            },

            {
              pattern: './types',
              group: 'sibling',
              position: 'before',
            },

            {
              pattern: './utils/**',
              group: 'sibling',
              position: 'before',
            },

            {
              pattern: './hooks/**',
              group: 'sibling',
              position: 'before',
            },

            {
              pattern: '*.(png|jpe?g)',
              patternOptions: { matchBase: true },
              group: 'index',
              position: 'after',
            },

            {
              pattern: '*.css',
              patternOptions: { matchBase: true },
              group: 'index',
              position: 'after',
            },
          ],

          'newlines-between': 'always-and-inside-groups',
          'pathGroupsExcludedImportTypes': ['builtin'],
        },
      ],
    },
  }
);
