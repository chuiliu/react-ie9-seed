const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),  // 打包输出路径
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: './',  // 添加在静态资源前面的路径
    chunkFilename: 'js/[name].[chunkhash:8].js'  // 按需加载的js
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // use: [{
        //     loader: 'babel-loader?cacheDirectory=true'
        // }]
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            'env',
            'react'
          ],
          plugins: [
            'react-hot-loader/babel',
            'babel-plugin-syntax-dynamic-import',
            ['import', [{
              libraryName: 'antd',
              style: true
            }]]
          ],
          cacheDirectory: true,
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,  // 小于等于8K转base64
          name: 'img/[name].[ext]?[hash:8]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader?name=[hash:8].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less', '.css'],  // import时可以省略后缀名
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'runtime'
    // }),
  ]
};
