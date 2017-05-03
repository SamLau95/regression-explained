var path = require('path');
var webpack = require('webpack');

var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'static/bundle.js',
    path: path.resolve(__dirname),
    publicPath: '',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ],
  },

  plugins: [
    new LodashModuleReplacementPlugin({
      'collections': true,
      'shorthands': true,
    }),

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
