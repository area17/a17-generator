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

console.log(`Creating '${appName}' at ${process.cwd()} \n`);

console.log(chalk.blue(`[1/3] Create package.json file`));
writePkgJson();
console.log(chalk.blue(`[2/3] Install packages(This might take some time)`));
installPackage();
console.log(chalk.blue(`[3/3] Generate boilerplate files`));
init();

console.log(chalk.green('Finished, enjoy!'));

function writePkgJson() {

	if(fs.existsSync(path.join(process.cwd(),'package.json'))) {
		let answer = readlineSync.question('Existing package.json is found, continue will overwrite, are you sure?(y/n)');
		if(answer !== 'y') {
			process.exit();
		}
	}

	let sourceOption = readlineSync.question('Which task runner do you prefer? (npm/gulp[default])');
	let a17Source;

	if(sourceOption === 'npm') {
		a17Source = 'git+https://code.area17.com/a17/a17-script.git#npm-tasks';
	} else {
		a17Source = 'git+https://code.area17.com/a17/a17-script.git#gulp';
	}

	const packageJson = {
		name: appName,
		version: '0.1.0',
		private: true,
		dependencies: {
			'a17-helpers': 'git+https://code.area17.com/a17/a17-helpers.git',
		},
		devDependencies: {
			'a17-script': a17Source,
		},
		scripts: {
			'init': 'a17-script init'
		},
		engines: {
			'node': '>= 6.10.3',
			'npm': '>= 3.10.10'
		}
	};
	
	fs.writeFileSync(
		path.join(process.cwd(),'package.json'),
		JSON.stringify(packageJson, null, 2)
	);

	console.log(chalk.green('package.json is created'));
}

function installPackage() {
	let result = spawn.sync('npm', ['install'], {stdio: 'inherit'});

	if(result.status === 1) {
		console.log(chalk.red('Exit with an error'));
		process.exit();
	} else {
		console.log(chalk.green('Packages are successfully installed'));
	}
}

function init() {
	console.log(`Start to initialize project`);
	let result = spawn.sync('npm', ['run','init'], {stdio: 'inherit'});
	
	if(result.status === 1) {
		console.log(chalk.red('Exit with an error'));
		process.exit();
	} else {
		console.log(chalk.green('Files are generated'));
	}
}



