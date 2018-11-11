const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
const PORT = process.env.PORT || 8000;

module.exports = merge(baseConfig, {
  entry: {
    app: [
      'react-hot-loader/patch',
      'babel-polyfill',
      path.resolve(__dirname, '../src/index.js')
    ],
    vendor: ['react', 'react-dom', 'react-router-dom', 'react-redux']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),  // 打包输出路径
    filename: 'js/[name].[hash:8].js',  // 因chunkhash与webpack-dev-server --hot不兼容，因此dev暂用hash，prod应该用trunkhash
    publicPath: './',  // 添加在静态资源前面的路径
    chunkFilename: 'js/[name].[chunkhash:8].js'  // 按需加载的js
  },
  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    port: PORT,
    // hot: true,
    open: false,
    publicPath: '/', // TODO:
    contentBase: 'dist',
    // contentBase: path.join(__dirname, '../dist')
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
