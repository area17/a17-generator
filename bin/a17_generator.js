#!/usr/bin/env node
'use strict';

import child_process from 'child_process';
import chalk from 'chalk';
import path from 'path';
import readlineSync from 'readline-sync';

import libs from '../src/libs.js';

import writePkgJson from '../src/writePkgJson.js';
import applicationOptions from '../src/applicationOptions.js';
import installPackages from '../src/installPackages.js';
import copySetupFiles from '../src/copySetupFiles.js';
import postInstall from '../src/postInstall.js';

const processArgv = [...process.argv];
const args = processArgv.slice(2);
const appName = args[0] === undefined ? path.basename(process.cwd()) : args[0];

console.log(`
         17771                /7A
        /77777/              /A7/
       /A777777/             A7/
       A77A/A777/           171
      A777/ /A77A/         171
     1777/   /777A        17A
    17777777777777A      /7A
   /777A1111111A7771    /7A/
  /777A         17771  /77/
  A777/          7777/ A71
`);

console.log(chalk.green(`Creating '${appName}' at ${process.cwd()}`));

console.log(chalk.magenta(`\n[1/4] Choose application options`));
const installOptions = applicationOptions();

console.log(chalk.magenta(`\n[2/4] Create package.json file`));
writePkgJson(appName, installOptions);

console.log(chalk.magenta(`\n[3/4] Install packages (This might take some time)`));
installPackages(installOptions);

console.log(chalk.magenta(`\n[4/4] Copy setup files`));
copySetupFiles(installOptions, processArgv);


console.log(chalk.green('\n\nFinished\n'));
postInstall(installOptions);
