const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {SRC_PATH} = require('./utils');
const base = require('./base');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const dev = {
  devServer: {
    contentBase: SRC_PATH,
    compress: false,
    port: 8080,
    open: true, // open when server is ready
    quiet: true, // allow to use FriendlyErrorsPlugin
    overlay: true, // show errors in browser
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_PATH, 'index.html')
    }),
    new FriendlyErrorsPlugin()
  ]
};

module.exports = merge.smart(base, dev);
