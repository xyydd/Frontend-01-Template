const path = require('path')

function resolve (p) {
  return path.resolve(__dirname, p)
}

module.exports = {
  mode: 'development',
  entry: './main.js',
  output: {
    filename: '[name].js',
    path: resolve('dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-react-jsx', { pragma: 'createElement' }]]
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '127.0.0.1',
    port: '8080',
    compress: true
  }
}
