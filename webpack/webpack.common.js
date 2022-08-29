const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    application: './frontend/js/application.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    clean: true,
    publicPath: process.env.ASSET_PATH || '/'
  }
};
