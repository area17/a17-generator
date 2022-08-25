import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import readlineSync from 'readline-sync';

// Generate package.json file for the project
const writePkgJson = (appName) => {

  if(fs.existsSync(path.join(process.cwd(),'package.json'))) {
    let answer = readlineSync.question('Existing package.json is found, continue will overwrite, are you sure?(y/n)');
    if(answer !== 'y') {
      process.exit();
    }
  }

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
}

export default writePkgJson;
