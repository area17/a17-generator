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


// Main install process
console.log(chalk.green('Start to install'));

console.log(`Creating '${appName}' at ${process.cwd()} \n`);

console.log(chalk.blue(`[1/3] Create package.json file`));
writePkgJson();
console.log(chalk.blue(`[2/3] Install packages(This might take some time)`));
installPackage();
console.log(chalk.blue(`[3/3] Generate boilerplate files`));
init();

console.log(chalk.green('Finished, enjoy!'));
// End of install process


// Generate package.json file for the project
function writePkgJson() {

	if(fs.existsSync(path.join(process.cwd(),'package.json'))) {
		let answer = readlineSync.question('Existing package.json is found, continue will overwrite, are you sure?(y/n)');
		if(answer !== 'y') {
			process.exit();
		}
	}

	const packageJson = {
		name: appName,
		version: '0.1.0',
		private: true,
		dependencies: {
			'@area17/a17-helpers': '^2.0.0',
		},
		devDependencies: {
			'@area17/a17-boilerplate': '^7.0.0',
			"@epegzz/sass-vars-loader": "^6.0.0"
		},
		scripts: {
			'init': 'a17-bp init'
		},
		engines: {
			'node': '>= 10.15.0',
			'npm': '>= 6.4.1'
		}
	};

	fs.writeFileSync(
		path.join(process.cwd(),'package.json'),
		JSON.stringify(packageJson, null, 2)
	);

	console.log(chalk.green('package.json is created'));
}

// Install necessary packages (a17-helpers / a17-scripts)
function installPackage() {
	let result = spawn.sync('npm', ['install'], {stdio: 'inherit'});

	if(result.status === 1) {
		console.log(chalk.red('Exit with an error'));
		process.exit();
	} else {
		console.log(chalk.green('Packages are successfully installed'));
	}
}

// Initialize files (using a17-script init function)
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



