module.exports =  { 
    "extends": "airbnb-base",
    env: {
        node: true
    },
    rules: {
        // Tweak rules set by airbnb config
        // We need to allow use of console.log for verbose mode
        'no-console': 'off',
      },
};
