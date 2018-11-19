const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
// const apiMocker = require('webpack-api-mocker');
const baseConfig = require('./webpack.base.config');
const PORT = process.env.PORT || 8000;

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
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
    rules: [
      {
        test: /\.css|less$/,
        include: /src/,
        use: [
          {
            loader: 'style-loader'
          },
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
        ]
      },
      // 处理antd样式
      {
        test: /\.css|less$/,
        exclude: /src/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
                importLoaders: 1
            }
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      }
    ]
  },
  devServer: {
    // before(app) {
    //   apiMocker(app, path.resolve(__dirname, '../mock/index.js'), {
    //     proxy: {
    //       '/repos/*': 'https://api.github.com/',
    //     },
    //     changeHost: true
    //   })
    // },
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
    })
  ],
});
