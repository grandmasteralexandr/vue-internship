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
  },

  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.js']
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] }
        }
      ]
    },
  }
}
