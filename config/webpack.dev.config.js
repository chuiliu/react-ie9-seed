const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const PORT = process.env.PORT || 8000;

module.exports = merge(baseConfig, {
  entry: {
    app: [
      'react-hot-loader/patch',
      path.resolve(__dirname, '../src/index.js')
    ],
    vendor: ['babel-polyfill', 'raf/polyfill', 'react', 'react-dom', 'react-router-dom']
  },
  output: {
    filename: 'js/[name].[hash:8].js',  // 因chunkhash与webpack-dev-server --hot不兼容，因此dev暂用hash，prod应该用trunkhash
  },
  module: {
    rules: [{
      test: /\.css|less$/,
      // 让热加载支持提取CSS
      use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
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
      }))
    }]
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: PORT,
    // hot: true,
    open: false,
    publicPath: '/', // TODO:
    contentBase: 'dist',
    // contentBase: path.resolve(__dirname, '../dist')
    historyApiFallback: true,
    // proxy: {
    //   '/api': 'http://localhost:8000'
    // }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    // new webpack.HotModuleReplacementPlugin()
  ],
});
