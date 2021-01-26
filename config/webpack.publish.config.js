const { merge } = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.config');
const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = merge(
  baseConfig,
  {
    entry: './index.js',
    devtool: false,
    mode: 'production',
    resolve: {
      alias: undefined,
    },
    output: {
      // TODO
      library: 'your-components-name',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, '../dist'),
      filename: '[name].js',
      publicPath: './'
    },
    optimization: {
      minimize: true,
      minimizer: [new CssMinimizerPlugin({})],
    },
  }
);

module.exports = config;
