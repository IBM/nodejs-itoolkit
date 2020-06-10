module.exports = {
  extends: 'airbnb-base',
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
      rules: {
        // These are set by airbnb-base, but go against Mocha conventions
        // See https://mochajs.org/#arrow-functions
        // and https://github.com/airbnb/javascript/issues/433
        'func-names': 'off',
        'prefer-arrow-callback': 'off',
      },
    },
  ],
};
