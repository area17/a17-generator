import child_process from 'child_process';
import chalk from 'chalk';

import libs from './libs.js';

function installPackage(cmd) {
  try {
    return child_process.execSync(cmd).toString();
  } catch (error) {
    console.error(chalk.red(`${cmd} failed`));
  }
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
}

export default installPackages;
