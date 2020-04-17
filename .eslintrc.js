module.exports =  { 
    "extends": "airbnb-base",
    env: {
        node: true
    },
    rules: {
        // Tweak rules set by airbnb config
        'no-console': 'off', // allow console
        'import/no-extraneous-dependencies': ["error", {"optionalDependencies": true}], // Allow optional dep import
        // Warn unresolved imports ie: idb-connector import will be unresolved when on non IBM i system.
        'import/no-unresolved': ['off', { commonjs: true }],
      },
};
