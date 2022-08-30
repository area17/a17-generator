const path = require('path');
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const devMode = process.env.NODE_ENV !== 'production';
const passThroughVars = devMode ? {
  'process.env.MODE': JSON.stringify('development'),
} : {
  'process.env.MODE': JSON.stringify('production'),
};

module.exports = {
  mode: devMode ? 'development' : 'production',
  devtool: devMode ? 'inline-source-map' : false,
  entry: {
    application: './frontend/js/application.js',
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
    ]
  },
  plugins: [
    new webpack.DefinePlugin(passThroughVars),
    new WebpackManifestPlugin({
      fileName: 'manifest.json',
      basePath: '/',
      publicPath: '/'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: './frontend/fonts/*.*',
          to: './public/assets/fonts/[name][ext]',
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
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
