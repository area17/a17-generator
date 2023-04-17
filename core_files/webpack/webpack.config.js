const path = require('path');
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
::CSS_REQUIRES::
::SPRITE_REQUIRES::

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'inline-source-map' : false,
  entry: {
    'js/application': './::FOLDER_PREFIX::frontend/js/application.js',
    ::CSS_ENTRY::
  },
  output: {
    filename: devMode ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: devMode ? 'js/[id].js' : 'js/[id].[contenthash].js',
    path: path.resolve(__dirname, 'public/assets/'),
    clean: true,
    //publicPath: '/',
  },
  optimization: {
    minimize: !devMode,
    minimizer: [
      new TerserPlugin(),
      ::CSS_MINIMIZER::
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.MODE': JSON.stringify(devMode ? 'development' : 'production')
    }),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      basePath: '/',
      publicPath: '/'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './::FOLDER_PREFIX::frontend/fonts/*.*',
          to: './public/assets/fonts/[name][ext]',
          noErrorOnMissing: true,
        },
      ],
    }),
    ::CSS_PLUGINS::
    ::SPRITE_PLUGINS::
  ],
  module: {
    rules: [
      ::CSS_MODULES::
    ]
  },
  devServer: {
    port: 3000,
    open: false,
    hot: false,
    compress: true,
    // proxy: {
    //   '/': 'APP_URL',
    // },
    // devMiddleware: {
    //   publicPath: '/',
    // },
    //watchFiles: ['./public/*.html'],
  },
};
