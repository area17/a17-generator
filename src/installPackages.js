import child_process from 'child_process';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import copyFile from './copyFile.js';
import runCommand from './runCommand.js';
import libs from './libs.js';

const generatorPath = path.resolve(dirname(fileURLToPath(import.meta.url)), '../');

const installPackage = (cmd) => {
  if (typeof cmd === 'string') {
    runCommand(cmd);
    return;
  }

  if (Array.isArray(cmd)) {
    cmd.forEach(command => {
      runCommand(command);
    });
    return;
  }

  console.log(chalk.red(`Unknown command ${ cmd } - type ${ typeof cmd }`));
};

function installPackages(opts) {
  // install scripting first because VUE will want to overrite the dir
  if (opts.scripting > -1) {
    const selectedScripting = libs.scripting[opts.scripting];
    console.log(chalk.yellow(`Installing ${ selectedScripting.name }`));
    installPackage(selectedScripting.cmd);
  }

  if (opts.jsHelpers) {
    console.log(chalk.yellow(`Installing ${ libs.jsHelpers.name }`));
    installPackage(libs.jsHelpers.cmd);
  }

  if (opts.styling > -1) {
    const selectedStyling = libs.styling[opts.styling];
    console.log(chalk.yellow(`Installing ${ selectedStyling.name }`));
    installPackage(selectedStyling.cmd);
  }

  if (opts.patternLibrary > -1) {
    const selectedPatternLibrary = libs.patternLibraries[opts.patternLibrary];
    console.log(chalk.yellow(`Installing ${ selectedPatternLibrary.name }`));
    installPackage(selectedPatternLibrary.cmd);
  }

  if (opts.installing.webpack) {
    console.log(chalk.yellow(`Installing Webpack`));
    runCommand('npm install --save-dev webpack webpack-cli webpack-dev-server webpack-watch-files-plugin copy-webpack-plugin terser-webpack-plugin webpack-manifest-plugin');

    if (opts.installing.scssUtilities) {
      runCommand('npm install --save-dev @epegzz/sass-vars-loader mini-css-extract-plugin sass css-minimizer-webpack-plugin css-loader sass-loader style-loader webpack-fix-style-only-entries');
    }

    if (opts.installing.tailwindPlugins) {
      runCommand('npm install --save-dev autoprefixer css-loader css-minimizer-webpack-plugin mini-css-extract-plugin postcss-import postcss-loader webpack-fix-style-only-entries');
      runCommand('npm install tailwindcss');
    }

    if (opts.installing.svgsprite) {
      runCommand('npm install --save-dev github:cascornelissen/svg-spritemap-webpack-plugin#pull/210/head');
    }
  }

  if (opts.installing.vite) {
    console.log(chalk.yellow(`Installing Vite`));
    runCommand('npm install --save-dev vite vite-plugin-dynamic-import vite-plugin-environment vite-plugin-eslint vite-plugin-static-copy');

    if (opts.installing.laravel) {
      runCommand('npm install --save-dev laravel-vite-plugin');
    }

    if (opts.installing.tailwindPlugins) {
      runCommand('npm install tailwindcss');
    }

    if (opts.installing.svgsprite) {
      // uses `file:vite-svg-sprite-wrapper-1.0.3.tgz` until
      // https://github.com/vshepel/vite-svg-sprite-wrapper/pull/2
      // is merged
      //runCommand('npm install --save-dev vite-svg-sprite-wrapper');
      copyFile(path.resolve(generatorPath, 'core_files/vite/vite-svg-sprite-wrapper-1.0.3.tgz'), `./`);
      runCommand('npm install --save-dev vite-svg-sprite-wrapper-1.0.3.tgz');
    }
  }

  if (opts.lintFiles && opts.installing.linters) {
    console.log(chalk.yellow(`Installing Linters`));
    // `stylelint-config-prettier` removed:
    // https://stylelint.io/migration-guide/to-15/#deprecated-stylistic-rules
    runCommand(`npm install --save-dev stylelint stylelint-config-recommended stylelint-order stylelint-prettier lint-staged eslint prettier eslint-plugin-prettier eslint-config-prettier @prettier/plugin-php`);

    if (!opts.installing.tailwindPlugins) {
      runCommand(`npm install --save-dev stylelint-scss`);
    }
  }

  if (opts.installing.preCommitHook) {
    runCommand('npm install --save-dev husky');
  }

  // vue adds things to the package json that will need installing
  if (opts.installing.vue) {
    runCommand('npm install')
  }
}

export default installPackages;
