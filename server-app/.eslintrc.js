module.exports = {
    env: {
        node: true,
        es2021: true,
    },
    extends: ['standard'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'no-var': 'error',
        semi: 'off',
        indent: ['error', 4, { SwitchCase: 1 }],
        'no-multi-spaces': 'error',
        'space-in-parens': 'error',
        'no-multiple-empty-lines': 'error',
        'prefer-const': 'error',
        'no-use-before-define': 'error',
        'max-len': ['error', 150],
        'space-before-function-paren': ['off'],
        'comma-dangle': ['off']
    },
};
