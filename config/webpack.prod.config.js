const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, '../src/index.js')
    ],
    vendor: ['react', 'react-dom', 'react-router-dom', 'react-redux']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),  // 打包输出路径
    filename: 'js/[name].[chunkhash:8].js',  // 因chunkhash与webpack-dev-server --hot不兼容，因此dev暂用hash，prod应该用trunkhash
    publicPath: './',  // 添加在静态资源前面的路径
    chunkFilename: 'js/[name].[chunkhash:8].js'  // 按需加载的js
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
    new webpack.HashedModuleIdsPlugin()
  ]
});
