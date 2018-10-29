import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import WebpackDevServer from 'webpack-dev-server';
import baseConfig from './webpack.base.config';
const PORT = process.env.PORT || 8000;

const config = merge(baseConfig, {
  entry: {
    app: [
      `webpack-dev-server/client?http://localhost:${PORT}/`,
      'webpack/hot/dev-server',
      'babel-polyfill',
      path.resolve(__dirname, '../src/index.js')
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  mode: 'development'
})

const complier = webpack(config);

const server = new WebpackDevServer(complier, {
  host: '0.0.0.0',
  inline: true,
  hot: true,
  open: true,
  filename: config.output.filename,
  publicPath: config.output.publicPath,
  contentBase: 'dist',
  historyApiFallback: true,
  stats: {
    colors: true
  }
});

server.listen(PORT, 'localhost', () => {
  console.log(`server started at localhost:${PORT}`);
})


// export default merge(baseConfig, {
//   devtool: 'inline-source-map',
//   devServer: {
//     host: '0.0.0.0',
//     port: 8000,
//     inline: true,
//     hot: true,
//     open: true,
//     publicPath: '/', // TODO:
//     contentBase: 'dist',
//     historyApiFallback: true
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: JSON.stringify('development')
//       }
//     }),
//     new webpack.HotModuleReplacementPlugin()
//   ]
// });
