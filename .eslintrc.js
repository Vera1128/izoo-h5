module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:promise/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:sonarjs/recommended',
    ],
    globals: {
        APP_ENV: true,
        isNaN: true,
        APP_NAME: true,
        APP_BASENAME: true,
        XMREP_BID: true,
        SENTRY_DSN: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            generators: true,
            legacyDecorators: true,
            experimentalObjectRestSpread: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: 'scripts/webpack/webpack.common.js',
            },
        },
    },
    plugins: ['react', '@typescript-eslint', 'promise', 'sonarjs'],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                ts: 'never',
                tsx: 'never',
                json: 'never',
                js: 'never',
            },
        ],
        semi: ['warn', 'never'],
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'no-use-before-define': [
            'warn',
            {
                functions: false,
                classes: false,
                variables: false,
            },
        ],
        'object-shorthand': 'off',
        'func-names': 'off',
        'no-underscore-dangle': 'warn',
        'consistent-return': 'off',
        'no-extra-boolean-cast': 'off',
        'class-methods-use-this': 'off',
        'promise/always-return': 'off',
        'promise/catch-or-return': 'off',
        'no-shadow': 'warn',
        'no-useless-escape': 'off',
        'no-prototype-builtins': 'off',
        'guard-for-in': 'warn',
        'import/prefer-default-export': 'off',

        // sonarjs
        'sonarjs/cognitive-complexity': 'error',
        'sonarjs/no-identical-expressions': 'error',
        'sonarjs/no-identical-functions': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/prefer-immediate-return': 'off',

        // react
        'react/jsx-props-no-spreading': 'off',
        'react/prop-types': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/no-array-index-key': 'off',
        'react/no-unused-state': 'off',
        'react/sort-comp': 'off',
        'react/no-deprecated': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'react/destructuring-assignment': 'off',
        'jsx-a11y/alt-text': 'warn',
        'react/display-name': 'off',
        'react/no-children-prop': 'off',
        'react/jsx-boolean-value': 'off',

        // typescript
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-this-alias': 'off',
        '@typescript-eslint/no-empty-function': 'off',
    },
    overrides: [{
        files: ['src/**/*.ts', 'src/**/*.tsx'],
        rules: {
            '@typescript-eslint/no-var-requires': 'off',
            'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
            'global-require': 'off',
            'no-use-before-define': 'off',
        },
    }, ],
}