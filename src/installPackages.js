import child_process from 'child_process';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';

import runCommand from './runCommand.js';
import libs from './libs.js';

function installPackage(cmd) {
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

  if (opts.webpack) {
    console.log(chalk.yellow(`Installing Webpack`));
    runCommand('npm install webpack webpack-cli webpack-merge webpack-watch-files-plugin copy-webpack-plugin terser-webpack-plugin webpack-manifest-plugin');
  }

  /*
  if (opts.dotFiles) {
    console.log(chalk.yellow(`Installing Stylelint`));
    runCommand(`npm install --save-dev stylelint stylelint-config-recommended stylelint-order stylelint-prettier`)
  }
  */

  if (opts.installingVue) {
    runCommand('npm install')
  }
}

export default installPackages;
