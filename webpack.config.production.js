var path = require('path');
var webpack = require('webpack');

var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'static/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.json$/,
        use: 'json-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new LodashModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    // Load html files

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    }),
  ]
};
