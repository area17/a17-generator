import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import readlineSync from 'readline-sync';

import libs from './libs.js';

// Generate package.json file for the project
const writePkgJson = (appName, opts) => {

  if(!fs.existsSync(path.join(process.cwd(),'package.json')) && !opts.installing.vue) {
    const packageJson = {
      name: appName,
      version: '0.0.1',
      description: "The generator of A17 Bolierplate",
      author: "A17 <dev@area17.com> (https://area17.com/)",
      license: "MIT",
    };

    if (opts.installing.webpack) {
      packageJson.scripts = packageJson.scripts || {};
      packageJson.scripts.build = 'webpack';
      packageJson.scripts.dev = 'webpack serve --open';
      packageJson.scripts.prod = 'NODE_ENV=production webpack';
      packageJson.scripts.watch = 'webpack --watch';
    }

    if (opts.lintFiles && opts.installing.linters) {
      packageJson.scripts = packageJson.scripts || {};
      packageJson.scripts.lint = 'lint-staged';
      packageJson.scripts.eslint = 'npx eslint "**/*/js"';
      packageJson.scripts.prettier = 'prettier --list-different';
      packageJson.scripts.stylelint = 'npx stylelint "**/*.(css|scss|sass)"';
    }

    fs.writeFileSync(
      path.join(process.cwd(),'package.json'),
      JSON.stringify(packageJson, null, 2)
    );

    console.log(chalk.yellow('package.json is created'));
  } else {
    if (opts.installing.vue) {
      console.log(chalk.yellow('Skipping package.json creation, Vue will create one'));
    } else {
      console.log(chalk.yellow('Existing package.json found, skipping creation'));
    }
  }
}

export default writePkgJson;
