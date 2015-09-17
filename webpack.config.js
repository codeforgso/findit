var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

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
    loaders: [
    { test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ['react-hot', 'babel'],
    },
    { test: /\.json$/, loader: 'json' },
    { test: /\.(png|jpg|jpeg|gif|svg(\?v=[0-9]\.[0-9]\.[0-9])?)$/,
      loaders: [
        'url?name=assets/[hash].[ext]&limit=8192',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    },
    { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url?name=assets/[hash].[ext]&limit=10000&mimetype=application/font-woff"
    },
    { test: /\.(ttf|eot|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file?name=assets/[hash].[ext]' },
    { test: /\.(md|markdown)$/, loader: 'html!markdown-highlight' },
    { test: /\.html$/, loader: 'html?minimize=false' },
    { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less') },
    { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') } ]
  },
  devServer: {
    noInfo: true,
    hot: true,
    inline: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("styles.css")
  ]
};
