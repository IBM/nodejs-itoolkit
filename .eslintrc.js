module.exports = {
  extends: 'airbnb-base',
  plugins: [
    'mocha',
  ],
  env: {
    node: true,
  },
  rules: {
    // Tweak rules set by airbnb config
    // We need to allow use of console.log for verbose mode
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['test/**/*.js'],
      env: {
        node: true,
        mocha: true,
      },
      extends: 'plugin:mocha/recommended',
      rules: {
        // These are set by airbnb-base, but go against Mocha conventions
        // See https://mochajs.org/#arrow-functions
        // and https://github.com/airbnb/javascript/issues/433
        'func-names': 'off',
        'prefer-arrow-callback': 'off',

        // The following rules cause problems for our existing tests, so they are disabled for now:
        'mocha/no-mocha-arrows': 'off',
        'mocha/no-skipped-tests': 'off',
        'mocha/no-hooks-for-single-case': 'off',
        'mocha/no-identical-title': 'off',
      },
    },
  ],
};
