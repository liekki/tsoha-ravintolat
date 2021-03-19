module.exports = {
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    semi: ['error', 'never'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'comma-dangle': ['error', 'never'],
    'react/prop-types': [0],
    'no-case-declarations': 0,
    'import/prefer-default-export': 'off'
  },
  env: {
    browser: true
  }
}
