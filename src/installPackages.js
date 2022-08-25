import child_process from 'child_process';
import chalk from 'chalk';

import libs from './libs.js';

function runCommand(cmd) {
  if (cmd.indexOf('vue') > -1) {
    child_process.execSync(cmd);
  } else {
    try {
      return child_process.execSync(cmd).toString();
    } catch (error) {
      console.error(chalk.red(`${cmd} failed`));
    }
  }
}

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
  if (opts.styling > -1) {
    const selectedStyling = libs.styling[opts.styling];
    console.log(chalk.yellow(`Installing ${ selectedStyling.name }`));
    installPackage(selectedStyling.cmd);
  }

  if (opts.scripting > -1) {
    const selectedScripting = libs.scripting[opts.scripting];
    console.log(chalk.yellow(`Installing ${ selectedScripting.name }`));
    installPackage(selectedScripting.cmd);
  }

  if (opts.jsHelpers) {
    console.log(chalk.yellow(`Installing ${ libs.jsHelpers.name }`));
    installPackage(libs.jsHelpers.cmd);
  }

  if (opts.patternLibrary > -1) {
    const selectedPatternLibrary = libs.patternLibraries[opts.patternLibrary];
    console.log(chalk.yellow(`Installing ${ selectedPatternLibrary.name }`));
    installPackage(selectedPatternLibrary.cmd);
  }
}

export default installPackages;
