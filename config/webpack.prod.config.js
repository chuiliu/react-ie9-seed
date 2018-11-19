const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const extractCommon = new ExtractTextPlugin({
  filename: 'css/common.[contenthash:8].css',
  allChunks: true
});
const extractApp = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash:8].css',
  allChunks: true
});

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  entry: {
    app: [
      path.resolve(__dirname, '../src/index.js')
    ],
    vendor: ['babel-polyfill', 'raf/polyfill', 'react', 'react-dom', 'react-router-dom']
  },
  module: {
    rules: [
      {
        test: /\.css|less$/,
        include: /src/,
        use: extractApp.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]-[hash:base64:6]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins(loader) {
                  return [
                    require('postcss-import')({
                      root: loader.resourcePath
                    }),
                    require('autoprefixer')({
                      browsers: ['> 1%', 'last 2 versions', 'not ie < 9']
                    }),
                    require('cssnano')()
                  ]
                }
              }
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true
              }
            }
          ],
          publicPath: '../'
        })
      },

      // 处理antd样式
      {
        test: /\.css|less$/,
        exclude: /src/,
        use: extractCommon.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins(loader) {
                  return [require('cssnano')()]
                }
              }
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    extractCommon,
    extractApp,
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // new ExtractTextPlugin({
    //   filename: 'css/[name].[contenthash:8].css',
    //   allChunks: true,
    //   disable: false
    // }),
  ]
});
