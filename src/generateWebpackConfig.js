import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

const generateWebpackConfig = (opts, generatorPath) => {
  const folderStructurePrefix = opts.installing.laravel ? 'resources/' : '';
  let webpackConfig = fs.readFileSync(path.resolve(generatorPath, 'core_files/webpack/webpack.config.js'), { encoding:'utf8' } );

  webpackConfig = webpackConfig.replace(/::FOLDER_PREFIX::/ig, folderStructurePrefix);

  console.log(chalk.gray(`Update Webpack config options`));
  if (opts.installing.scssUtilities) {
    webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)::CSS_REQUIRES::/, `\nconst CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const DartScss = require('sass');`);
    webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)    ::CSS_ENTRY::/, `\n    'css/application': './${ folderStructurePrefix }frontend/scss/application.scss',`);
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
    webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)    ::CSS_PLUGINS::/, `\n    new RemoveEmptyScriptsPlugin({ verbose: true }),
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
              path.resolve(__dirname, './', 'frontend.config.json')
            ]
          }
        },
      ],
    },`);
  }

  if (opts.installing.tailwindPlugins) {
    webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)::CSS_REQUIRES::/, `\nconst MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');`);
    webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)    ::CSS_ENTRY::/, `\n    'css/application': './${ folderStructurePrefix }frontend/css/application.css',`);
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
    webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)    ::CSS_PLUGINS::/, `\n    new RemoveEmptyScriptsPlugin({ verbose: true }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
    }),`);
    webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)      ::CSS_MODULES::/, `\n      {
        test: /application.css$/,
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
                  require('tailwindcss')('./tailwind.config.js'),
                  require("autoprefixer"),
                ]
              }
            }
          }
        ]
      },`);
  }

  if (!opts.installing.scssUtilities && !opts.installing.tailwindPlugins) {
    webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)::CSS_REQUIRES::/, '');
    webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)    ::CSS_ENTRY::/, '');
    webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)      ::CSS_MINIMIZER::/, '');
    webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)    ::CSS_PLUGINS::/, '');
    webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)      ::CSS_MODULES::/, '');
  }

  if (opts.installing.svgsprite) {
    const cssSpritePath = (opts.installing.scssUtilities) ? `${ folderStructurePrefix }frontend/scss/sprite.css` : `${ folderStructurePrefix }frontend/css/sprite.css`;

    webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)::SPRITE_REQUIRES::/, `\nconst SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');`);
    webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)    ::SPRITE_PLUGINS::/, `\n    new SVGSpritemapPlugin('.${ folderStructurePrefix }/frontend/svg/*.svg', {
      output: {
        filename: devMode ? 'sprite.svg' : 'sprite.[contenthash].svg',
        chunk: {
          name: 'sprite',
        },
        svg: {
          attributes: {
            style: 'position: absolute; visibility: hidden;',
          }
        },
        svgo: {
          multipass: true,
          plugins: [
            {
              name: 'removeHiddenElems',
              active: false,
            },
            {
              name: 'removeViewBox',
              active: false,
            },
          ],
        }
      },
      sprite: {
        prefix: 'sprite-',
        prefixStylesSelectors: true,
        generate: {
          title: false,
        }
      },
      styles: {
        format: 'dimensions',
        filename: '${ cssSpritePath }',
      }
    }),`);
  } else {
    webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)::SPRITE_REQUIRES::/, '');
    webpackConfig = webpackConfig.replace(/(?:\r\n|\r|\n)    ::SPRITE_PLUGINS::/, '');
  }

  return webpackConfig;
};

export default generateWebpackConfig;
