#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const _ = require('lodash');
const readlineSync = require('readline-sync');

const processArgv = _.toArray(process.argv);
const args = processArgv.slice(2);
const appName = args[0];

console.log(chalk.green('Start to install'));

console.log(`Creating '${appName}' at ${process.cwd()}`);

writePkgJson();
installPackage();
init();

console.log(chalk.green('Finished'));

function writePkgJson() {

	if(fs.existsSync(path.join(process.cwd(),'package.json'))) {
		let answer = readlineSync.question(chalk.cyan('Existing package.json is found, continue will overwrite, are you sure?(y/n)'));
		if(answer !== 'y') {
			process.exit();
		}
	}

	const packageJson = {
		name: appName,
		version: '0.1.0',
		private: true,
		dependencies: {
			'a17-helpers': 'git+https://code.area17.com/a17/a17-helpers.git',
		},
		devDependencies: {
			'a17-script': 'git+https://code.area17.com/a17/a17-script.git#gulp',
		},
		scripts: {
			'init': 'a17-script init'
		}
	};
	
	fs.writeFileSync(
		path.join(process.cwd(),'package.json'),
		JSON.stringify(packageJson, null, 2)
	);
}

function installPackage() {
	console.log(`Start to install packages`);
	let result = spawn.sync('npm', ['install'], {stdio: 'inherit'});

	if(result.status === 1) {
		console.log(chalk.red('Fail to install packages'));
		process.exit();
	} else {
		console.log(chalk.green('Packages are successfully installed.'));
	}
}

function init() {
	console.log(`Start to initialize project`);
	let result = spawn.sync('npm', ['run','init'], {stdio: 'inherit'});
	
	if(result.status === 1) {
		console.log(chalk.red('Fail to initialize.'));
		process.exit();
	} else {
		console.log(chalk.green('Successfully initialized'));
	}
}



