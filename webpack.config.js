var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/only-dev-server',
    './index.js'
  ],
  output: {
    path: __dirname,
    filename: 'js/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['react-hot', 'babel'],
    },
    { test: /\.json$/, loader: 'json' }]
  },
  devServer: {
    noInfo: true,
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
