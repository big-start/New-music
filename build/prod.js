const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { SRC_PATH } = require('./utils')
const base = require('./base')
const Dotenv = require('dotenv-webpack');
base.output.publicPath = './'

const prod = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
    ]
  },
  plugins: [
    new Dotenv(),
    new ExtractTextPlugin("styles.[hash:7].css"),
    new OptimizeCSSPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(SRC_PATH, 'index.html')
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new UglifyJSPlugin()
  ]
}

module.exports = merge.smart(base, prod)
