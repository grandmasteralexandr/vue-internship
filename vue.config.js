const path = require('path')

module.exports = {
  pluginOptions: {

    /* Auto import styles to Vue files */
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/styles/*.scss'),
      ]
    }
  }
}
