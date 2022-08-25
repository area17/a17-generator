import child_process from 'child_process';
import chalk from 'chalk';

import libs from './libs.js';

function postInstall(opts) {
  if (opts.styling > -1) {
    const selectedStyling = libs.styling[opts.styling];
    console.log(chalk.yellow(`Docs for ${ selectedStyling.name }: ${ chalk.white(selectedStyling.docs) }`));
  }

  if (opts.scripting > -1) {
    const selectedScripting = libs.scripting[opts.scripting];
    console.log(chalk.yellow(`Docs for ${ selectedScripting.name }: ${ chalk.white(selectedScripting.docs) }`));
  }
}

export default postInstall;
