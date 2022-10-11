/* eslint-disable no-undef */
module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    // 'eslint:recommended',
    // 'plugin:react/recommended',
  ],
  'settings': {
    'react': {
      'version': 'detect',
    },
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
  ],
  'rules': {
    // "no-unused-vars": [
    //     "error",
    //     {
    //         "varsIgnorePattern": "^[A-Z]"
    //     }
    // ],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    'indent': [
      'error',
      2,
      { 'SwitchCase': 1 },
    ],
    'linebreak-style': [
      'error',
      'windows',
    ],
    // 'quotes': [
    //   'error',
    //   'single',
    // ],
    'semi': [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      'only-multiline',
    ],
  },
};
