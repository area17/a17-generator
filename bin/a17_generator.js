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
import initialiseGit from '../src/initialiseGit.js';

const processArgv = [...process.argv];
const args = processArgv.slice(2);
const maxSteps = 5;
const printStep = (str) => {
  console.log(chalk.magenta(`\n[${ currentStep++ }/${ maxSteps }] ${ str }`));
};
let currentStep = 1;
let appName = args[0] === undefined ? path.basename(process.cwd()) : args[0];

console.clear();
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

printStep('Choose application name');
console.log(chalk.cyan(`\nIs "${ chalk.white(appName) }" your application name?`));
if (readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'}) !== 0) {
  appName = readlineSync.question('What is your application name? ', {
    defaultInput: appName,
  });
}

printStep('First, lets choose application options');
const installOptions = applicationOptions();

console.log(chalk.green(`\nCreating '${ chalk.white(appName) }' at ${process.cwd()}`));

printStep('Create package.json file');
writePkgJson(appName, installOptions);

if (installOptions.git.init) {
  printStep('Initialise Git');
  initialiseGit(installOptions);
}

printStep('Copy setup files and folders');
copySetupFiles(installOptions, processArgv, appName);

printStep('Install packages (This might take some time)');
installPackages(installOptions);

console.log(chalk.green('\nFinished'));
postInstall(installOptions, appName);
