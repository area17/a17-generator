#!/usr/bin/env node
'use strict';

import chalk from 'chalk';
import path from 'path';
import readlineSync from 'readline-sync';

import libs from '../src/libs.js';

import writePkgJson from '../src/writePkgJson.js';
import installPackages from '../src/installPackages.js';

const processArgv = [...process.argv];
const args = processArgv.slice(2);
const appName = args[0] === undefined ? path.basename(process.cwd()) : args[0];

// Main install process
console.log(chalk.green('Start to install'));

console.log(`Creating '${appName}' at ${process.cwd()} \n`);

console.log(chalk.magenta(`[1/3] Create package.json file`));
writePkgJson(appName);

console.log(chalk.magenta(`[2/3] Choose FE application options`));

const installOptions = {
  styling: -1,
  scripting: -1,
};

console.log(chalk.cyan(`\nApplication styling with:`));
installOptions.styling = readlineSync.keyInSelect(libs.styling.map(type => type.name), null,
  { cancel: 'None' }
);

console.log(chalk.cyan(`\nApplication JavaScript with:`));
installOptions.scripting = readlineSync.keyInSelect(libs.scripting.map(type => type.name), null,
  { cancel: 'None' }
);

console.log(chalk.magenta(`[3/3] Install packages (This might take some time)`));
installPackages(installOptions);


console.log(chalk.green('\nFinished'));
// End of install process
