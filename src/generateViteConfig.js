import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

const generateViteConfig = (opts, generatorPath) => {
  const folderStructurePrefix = opts.installing.laravel ? 'resources/' : '';
  let viteConfig = fs.readFileSync(path.resolve(generatorPath, 'core_files/vite/vite.config.js'), { encoding:'utf8' } );

  viteConfig = viteConfig.replace(/::FOLDER_PREFIX::/ig, folderStructurePrefix);

  console.log(chalk.gray(`Update vite config options`));
  if (opts.installing.linters) {
    viteConfig = viteConfig.replace(/(?:\r\n|\r|\n)::ESLINT_IMPORT::/, `\nimport eslintPlugin from 'vite-plugin-eslint';`);
    viteConfig = viteConfig.replace(/(?:\r\n|\r|\n)        ::ESLINT_PLUGINS::/, `\n        eslintPlugin(),`);
  } else {
    viteConfig = viteConfig.replace(/(?:\r\n|\r|\n)::ESLINT_IMPORT::/, '');
    viteConfig = viteConfig.replace(/(?:\r\n|\r|\n)        ::ESLINT_PLUGINS::/, ``);
  }

  if (opts.installing.tailwindPlugins) {
    viteConfig = viteConfig.replace(/(?:\r\n|\r|\n)::TAILWIND_IMPORT::/, `\nimport tailwindcss from 'tailwindcss';`);
    viteConfig = viteConfig.replace(/(?:\r\n|\r|\n)    ::TAILWIND_CSS::/, `\n    css: {
        postcss: {
            plugins: [tailwindcss],
        },
    },`);
  } else {
    viteConfig = viteConfig.replace(/(?:\r\n|\r|\n)::TAILWIND_IMPORT::/, '');
    viteConfig = viteConfig.replace(/(?:\r\n|\r|\n)    ::TAILWIND_CSS::/, '');
  }

  if (opts.installing.svgsprite) {
    viteConfig = viteConfig.replace(/(?:\r\n|\r|\n)::SPRITE_IMPORT::/, `\nimport ViteSvgSpriteWrapper from 'vite-svg-sprite-wrapper';`);
    viteConfig = viteConfig.replace(/(?:\r\n|\r|\n)        ::SPRITE_PLUGINS::/, `\n    ViteSvgSpriteWrapper({
          icons: resolve(__dirname, '${ folderStructurePrefix }frontend/svg/*.svg'),
          outputDir: resolve(__dirname, './${ opts.installing.laravel ? './public' : './frontend' }/'),
          sprite: {
            mode: {
              symbol: {
                sprite: '../sprite.svg',
              },
            },
            svg: {
                xmlDeclaration: false,
                rootAttributes: {
                    class: 'absolute',
                    'aria-hidden': 'true',
                }
            },
            shape: {
              id: {
                generator: 'sprite-%s' // prefixes the symbols
              },
              transform: [
                {
                  svgo: {
                    plugins: [
                      { name: 'preset-default' },
                      'removeXMLNS',
                    ],
                  },
                },
              ],
            }
          }
        }),`);
  } else {
    viteConfig = viteConfig.replace(/(?:\r\n|\r|\n)::SPRITE_IMPORT::/, '');
    viteConfig = viteConfig.replace(/(?:\r\n|\r|\n)        ::SPRITE_PLUGINS::/, '');
  }

  if (opts.installing.laravel) {
    viteConfig = viteConfig.replace(/(?:\r\n|\r|\n)::LARAVEL_IMPORT::/, `\nimport laravel from 'laravel-vite-plugin';`);
    viteConfig = viteConfig.replace(/(?:\r\n|\r|\n)        ::LARAVEL_PLUGINS::/, `\n    laravel({
            input: [
                resolve(__dirname, '${ folderStructurePrefix }/frontend/css/application.css'),
                resolve(__dirname, '${ folderStructurePrefix }/frontend/js/application.js')
            ],
            refresh: true
        }),`);
  } else {
    viteConfig = viteConfig.replace(/(?:\r\n|\r|\n)::LARAVEL_IMPORT::/, ``);
    viteConfig = viteConfig.replace(/(?:\r\n|\r|\n)        ::LARAVEL_PLUGINS::/, '');
  }

  return viteConfig;
};

export default generateViteConfig;
