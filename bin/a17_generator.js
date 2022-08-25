#!/usr/bin/env node
'use strict';

import chalk from 'chalk';
import path from 'path';

import writePkgJson from '../src/writePkgJson.js';
import installPackages from '../src/installPackages.js';

const processArgv = [...process.argv];
const args = processArgv.slice(2);
const appName = args[0] === undefined ? path.basename(process.cwd()) : args[0];

// Main install process
console.log(chalk.green('Start to install'));

console.log(`Creating '${appName}' at ${process.cwd()} \n`);

console.log(chalk.blue(`[1/2] Create package.json file`));
writePkgJson(appName);

console.log(chalk.blue(`[2/2] Install packages(This might take some time)`));
installPackages();


console.log(chalk.green('Finished, enjoy!'));
// End of install process
