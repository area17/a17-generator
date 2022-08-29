import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import readlineSync from 'readline-sync';

import libs from './libs.js';

// Generate package.json file for the project
const writePkgJson = (appName, opts) => {

  if(!fs.existsSync(path.join(process.cwd(),'package.json')) && !opts.installingVue) {
    const packageJson = {
      name: appName,
      version: '0.0.1',
      description: "The generator of A17 Bolierplate",
      author: "A17 <dev@area17.com> (https://area17.com/)",
      license: "MIT",
    };

    if (opts.webpack) {
      packageJson.scripts = {};
      packageJson.scripts.build = 'webpack --config webpack.dev.js';
      packageJson.scripts.dev = 'webpack serve --open --config webpack.dev.js';
      packageJson.scripts.prod = 'webpack --config webpack.prod.js';
      packageJson.scripts.watch = 'webpack --config webpack.dev.js --watch';
    }

    fs.writeFileSync(
      path.join(process.cwd(),'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    console.log(chalk.green('package.json is created'));
  } else {
    if (opts.installingVue) {
      console.log(chalk.yellow('Skipping package.json creation, Vue will create one'));
    } else {
      console.log(chalk.yellow('Existing package.json found, skipping creation'));
    }
  }
}

export default writePkgJson;
