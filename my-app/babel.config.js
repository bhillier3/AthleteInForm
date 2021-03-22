module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  plugins: [
    '@babel/plugin-transform-runtime'
  ],
  env: {
    production: {
      only: ['src'],
      plugins: [
        [
          'transform-react-remove-prop-types',
          {
            removeImport: true
          }
        ]
      ]
    }
  }
};