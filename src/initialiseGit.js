import chalk from 'chalk';

import runCommand from './runCommand.js';

const initialiseGit = (opts) => {
  runCommand('git init --initial-branch=main');

  if (opts.git.origin && opts.git.origin !== '') {
    let origin = opts.git.origin.replace('git clone', '');
    console.log(chalk.yellow(`Setting remote origin to ${ origin }`));
    runCommand(`git remote add origin ${ origin }`);
  }

  console.log(chalk.yellow(`Git initialised`));
};

export default initialiseGit;
