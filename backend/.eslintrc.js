module.exports = {
  extends: [
    'airbnb-base',
  ],
  rules: {
    'no-console': [
      'error',
      {
        allow: [
          'error',
          'warn',
        ],
      },
    ],
  },
  env: {
    node: true,
    es2022: true,
  },
};
