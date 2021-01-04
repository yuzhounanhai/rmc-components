const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const path = require('path');

const config = merge(
  baseConfig,
  {
    entry: './src/index.js',
    devtool: 'cheap-module-source-map',
    mode: 'development',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/[name].[hash:8].js',
      publicPath: './'
    },
    devServer: {
      host: '0.0.0.0',
      port: 8021,
      publicPath: '/',
      contentBase: './build/',
      compress: true,
      // proxy: {},
      watchContentBase: true,
      watchOptions: {
        ignored: /node_modules/,
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        minify: {
          removeComments: true,
          collapseWhitespace: true
        },
        inject: true,
        hash: true
      }),
    ]
  }
);

module.exports = config;
