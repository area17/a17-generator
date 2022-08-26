import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import readlineSync from 'readline-sync';

import libs from './libs.js';

// Generate package.json file for the project
const writePkgJson = (appName, opts) => {

  const installingVue = opts.scripting > -1 && libs.scripting[opts.scripting].name.indexOf('Vue') > -1;

  if(!fs.existsSync(path.join(process.cwd(),'package.json')) && !installingVue) {
    const packageJson = {
      name: appName,
      version: '0.0.1',
      description: "The generator of A17 Bolierplate",
      author: "A17 <dev@area17.com> (https://area17.com/)",
      license: "MIT",
    };

    fs.writeFileSync(
      path.join(process.cwd(),'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    console.log(chalk.green('package.json is created'));
  } else {
    if (installingVue) {
      console.log(chalk.yellow('Skipping package.json creation, Vue will create one'));
    } else {
      console.log(chalk.yellow('Existing package.json found, skipping creation'));
    }
  }
}

export default writePkgJson;
