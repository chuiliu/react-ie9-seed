import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import merge from 'webpack-merge';
import baseConfig from './webpack.base.config';

export default merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
});
