const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const resolve = require.resolve;

const NODE_ENV = process.env.NODE_ENV;
const needSourceMap = NODE_ENV !== 'production';

const svgRegex = /\.svg(\?v=\d+\.\d+\.\d+)?$/;
const svgOptions = {
  limit: 10000,
  minetype: 'image/svg+xml',
};
const imageOptions = {
  limit: 10000,
};

module.exports = {
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx',
      '.json',
    ],
    alias: {
      "@": path.resolve(__dirname, '../components'),
      "app": path.resolve(__dirname, '../src'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [{
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: resolve('babel-loader')
      },
      {
        test: /\.(ts|tsx)?$/,
        use: [{
            loader: resolve('babel-loader'),
          },
          {
            loader: resolve('ts-loader'),
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: resolve('css-loader'),
            options: {
              sourceMap: needSourceMap,
            },
          },
          {
            loader: resolve('postcss-loader'),
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
              sourceMap: needSourceMap,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: resolve('css-loader'),
            options: {
              sourceMap: needSourceMap,
            },
          },
          {
            loader: resolve('postcss-loader'),
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
              sourceMap: needSourceMap,
            },
          },
          {
            loader: resolve('less-loader'),
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              sourceMap: needSourceMap,
            },
          },
        ],
      },

      // Images
      {
        test: svgRegex,
        loader: resolve('url-loader'),
        options: svgOptions,
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        loader: resolve('url-loader'),
        options: imageOptions,
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin()
  ]
};