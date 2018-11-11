const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  entry: {
    app: [
      path.resolve(__dirname, '../src/index.js')
    ],
    vendor: ['babel-polyfill', 'raf/polyfill', 'react', 'react-dom', 'react-router-dom']
  },
  module: {
    rules: [{
      test: /\.css|less$/,
      // 让热加载支持提取CSS
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
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
          'less-loader'
        ],
        publicPath: '../'
      })
    }]
  },
  devtool: 'cheap-module-source-map',
  plugins: [
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
    })
  ]
});
