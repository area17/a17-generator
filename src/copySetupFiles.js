import child_process from 'child_process';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

import runCommand from './runCommand.js';
import libs from './libs.js';

const copyFile = (filePath, targetPath = './') => {
  const fileName = path.basename(filePath);
  console.log(chalk.gray(`Copying ${ fileName }`));
  try {
    if (fs.existsSync(filePath)) {
      fs.copyFileSync(filePath, path.resolve(targetPath, fileName));
    } else {
      console.log(`Error: ${ filePath } doesn't exist`);
    }
  } catch(err) {
    console.log(`Error copying ${ filePath }`);
    console.error(err);
  }
};


const copySetupFiles = (opts, processArgv) => {

  if (opts.installing.folderStructure) {
    console.log(chalk.yellow(`Generating frontend folder structure`));
    fs.mkdirSync(path.resolve(process.cwd(), 'frontend'));
    fs.mkdirSync(path.resolve(process.cwd(), 'frontend/fonts'));
    fs.mkdirSync(path.resolve(process.cwd(), 'frontend/js'));

    if (opts.installing.scssUtilities) {
      fs.mkdirSync(path.resolve(process.cwd(), 'frontend/scss'));
    }

    if (opts.installing.tailwindPlugins) {
      fs.mkdirSync(path.resolve(process.cwd(), 'frontend/css'));
    }

    if (opts.installing.behaviors) {
      console.log(chalk.yellow(`Generating A17-behaviors file and folder structure`));
      fs.mkdirSync(path.resolve(process.cwd(), 'frontend/js/behaviors'));
      fs.mkdirSync(path.resolve(process.cwd(), 'frontend/js/helpers'));
      copyFile(path.resolve(processArgv[1], '../../behaviors/application.js'), 'frontend/js/');
      copyFile(path.resolve(processArgv[1], '../../behaviors/index.js'), 'frontend/js/behaviors');
      copyFile(path.resolve(processArgv[1], '../../behaviors/myBehavior.js'), 'frontend/js/behaviors');
    }
  }

  if (opts.installing.webpack) {
    console.log(chalk.yellow(`Copying Webpack setup files`));
    let webpackConfig = fs.readFileSync(path.resolve(processArgv[1], '../../webpack/webpack.config.js'), { encoding:'utf8' } );

    console.log(chalk.gray(`Update Webpack config options`));
    if (opts.installing.scssUtilities) {
      copyFile(path.resolve(processArgv[1], '../../scssUtilities/frontend.config.json'), 'frontend');
      webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)::CSS_REQUIRES::/, `\nconst CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const DartScss = require('sass');`);
      webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)    ::CSS_ENTRY::/, `\n    'css/application': './frontend/scss/application.scss',`);
      webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)      ::CSS_MINIMIZER::/, `\n      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: !devMode },
            },
          ],
        },
        minify: CssMinimizerPlugin.cssoMinify,
      }),`);
      webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)    ::CSS_PLUGINS::/, `\n    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
    }),`);
      webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)      ::CSS_MODULES::/, `\n      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: DartScss
            }
          },
          {
            loader: "@epegzz/sass-vars-loader",
            options: {
              syntax: 'scss',
              files: [
                path.resolve(__dirname, 'frontend', 'frontend.config.json')
              ]
            }
          },
        ],
      },`);
    } else if (opts.installing.tailwindPlugins) {
      webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)::CSS_REQUIRES::/, `\nconst MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');`);
      webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)    ::CSS_ENTRY::/, `\n    'css/application': './frontend/css/application.css',`);
      webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)      ::CSS_MINIMIZER::/, `\n      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: !devMode },
            },
          ],
        },
        minify: CssMinimizerPlugin.cssoMinify,
      }),`);
      webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)    ::CSS_PLUGINS::/, `\n    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
    }),`);
      webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)      ::CSS_MODULES::/, `\n      {
        test: /application\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-import'),
                  require('tailwindcss')('./frontend/tailwind.config.js'),
                  require("autoprefixer"),
                ]
              }
            }
          }
        ]
      },`);
    } else {
      webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)::CSS_REQUIRES::/, '');
      webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)    ::CSS_ENTRY::/, '');
      webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)      ::CSS_MINIMIZER::/, '');
      webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)    ::CSS_PLUGINS::/, '');
      webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)      ::CSS_MODULES::/, '');
    }

    console.log(chalk.gray(`Writing Webpack config file`));
    fs.writeFileSync(path.resolve(process.cwd(), 'webpack.config.js'), webpackConfig, { encoding: "utf8" });

    console.log(chalk.gray(`Set up default index file`));
    fs.mkdirSync(path.resolve(process.cwd(), 'public'));
    copyFile(path.resolve(processArgv[1], '../../webpack/index.html'), 'public');

    if (!opts.installing.behaviors) {
      console.log(chalk.gray(`Generating empty application.js`));
      fs.ensureFileSync(path.resolve(process.cwd(), 'frontend/js/application.js'));
    }
  }

  if (opts.nvmrc) {
    if(!fs.existsSync(path.join(process.cwd(),'.nvmrc'))) {
      console.log(chalk.yellow(`Generating .nvmrc file`));
      runCommand('node -v > .nvmrc');
    } else {
      console.log(chalk.gray(`.nvmrc file already exists, skipping generation`));
    }
  }

  if (opts.dotFiles) {
    try {
      fs.copySync(path.resolve(processArgv[1], '../../dot_files'), process.cwd(), { overwrite: false })
      console.log(chalk.yellow(`dot files added`));
    } catch (err) {
      console.log(chalk.red(`Adding dot files failed`));
      console.error(err)
    }
  }

  if (opts.styling > -1) {
    const selectedStyling = libs.styling[opts.styling];
    if (selectedStyling.files && selectedStyling.files.length) {
      console.log(chalk.yellow(`Copy ${ selectedStyling.name } set up files`));
      const targetPath = opts.installing.folderStructure ? 'frontend' : null;
      selectedStyling.files.forEach(file => {
        copyFile(file, targetPath);
      });
    }

    if (opts.installing.scssUtilities) {
      console.log(chalk.gray(`Adding an application.scss file`));
      fs.ensureDirSync('frontend/scss');
      copyFile(path.resolve(processArgv[1], '../../scssUtilities/application.scss'), 'frontend/scss');
    }

    if (opts.installing.tailwindPlugins) {
      console.log(chalk.gray(`Adding an application.css file`));
      fs.copySync(path.resolve(processArgv[1], '../../tailwindPlugins'), 'frontend/css', { overwrite: false })
    }
  }

};

export default copySetupFiles;
