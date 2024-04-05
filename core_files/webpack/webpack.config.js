const path = require('path');
const webpack = require('webpack');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
::CSS_REQUIRES::
::SPRITE_REQUIRES::

const feConfig = require('./frontend.config.json');

let breakpoints = [];
if (feConfig.structure && feConfig.structure.breakpoints) {
  for (const [key, value] of Object.entries(feConfig.structure.breakpoints)) {
    breakpoints.push({ name: key, start: value });
  }
  breakpoints = breakpoints.sort(
    (a, b) => parseInt(a.start) - parseInt(b.start)
  );
  breakpoints = breakpoints.map((a) => a.name);
}

const structure = feConfig.structure;

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
      'process.env.MODE': JSON.stringify(devMode ? 'development' : 'production'),
      'process.env.BREAKPOINTS': JSON.stringify(breakpoints),
      'process.env.STRUCTURE': JSON.stringify(structure),
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
    static: {
      directory: path.join(__dirname, 'public'),
    },
    watchFiles: ['./public/*.html'],
  },
};
