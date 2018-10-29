import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extra-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: {
    app: ['babel-polyfill', path.resolve(__dirname, '../src/index.js')],
    vendor: ['react', 'react-dom', 'react-router-dom', 'react-redux']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),  // 打包输出路径
    filename: 'js/[name].[hash].js',
    publicPath: './',  // 添加在静态资源前面的路径
    chunkFilename: 'js/[name].[chunkhash].js'  // 按需加载的js
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
            loader: 'babel-loader'
        }]
      },
      {
        test: /\.css|less$/,
        // 让热加载支持提取CSS
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [require('autoprefixer')()]
                }
              }
            },
            'less-loader'
          ],
          publicPath: '../'
        }))
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader?name=[hash].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.less', '.css']  // import时可以省略后缀名
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      allChunks: true,
      disable: false
    })
  ]
};
