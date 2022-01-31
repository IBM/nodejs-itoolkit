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
    // airbnb config forbids optionalDependencies
    // https://github.com/airbnb/javascript/blob/c5bee75b1b358a3749f1a6d38ee6fad73de28e29/packages/eslint-config-airbnb-base/rules/imports.js#L95
    "import/no-extraneous-dependencies": [ "error", { "optionalDependencies": true }],
    // Project uses opt deps like odbc and idb-connector which may not exist
    "import/no-unresolved": 'off',
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
        'mocha/no-skipped-tests': 'off',
      },
    },
  ],
};
