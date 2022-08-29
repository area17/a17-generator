const path = require('path');
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    application: './frontend/js/application.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
    publicPath: process.env.ASSET_PATH || '/'
  },
  optimization: {
    minimize: !devMode,
    minimizer: [
      new TerserPlugin(),
    ]
  },
  plugins: [
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      basePath: '/',
      publicPath: '/'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './frontend/fonts/*.*',
          to: './public/fonts/[name][ext]'
        },
      ],
    }),
  ],
};
