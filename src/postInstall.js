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

  if (opts.jsHelpers) {
    console.log(chalk.yellow(`Docs for ${ libs.jsHelpers.name }: ${ chalk.white(libs.jsHelpers.docs) }`));
  }

  if (opts.patternLibrary > -1) {
    const selectedPatternLibrary = libs.patternLibraries[opts.patternLibrary];
    console.log(chalk.yellow(`Docs for ${ selectedPatternLibrary.name }: ${ chalk.white(selectedPatternLibrary.docs) }`));
  }

  console.log(chalk.yellow(`\nA17 Dev Docs: ${ chalk.white('http://docs.dev.area17.com/') }`));

  if (opts.webpack) {
    console.log(chalk.yellow(`\nWebpack setup added - see package.json for available build, dev and prod tasks. It is a basic setup and will likely need to be updated to suit your project needs - for example updating the 'output.path' from './public'`));
  }

  console.log(`\n\n`);
}

export default postInstall;
