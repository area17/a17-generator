import fs from 'fs-extra';
import child_process from 'child_process';
import chalk from 'chalk';
import figlet from 'figlet';
import readline from 'readline';
import readlineSync from 'readline-sync';

import libs from './libs.js';

function postInstall(opts, appName) {
  console.log('\n_______________________________________________________________________________\n\n');

  console.log(chalk.cyan(figlet.textSync(appName, {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
      width: 80,
      whitespaceBreak: true
  })));

  console.log('\n  v0.0.1\n');

  console.log(chalk.green(`  ${ appName } created`));
  readlineSync.keyInPause(`  Hit any key to see post installation notes\n\n\n`, { guide: false });
  readline.moveCursor(process.stdout, 0, -4);
  readline.clearLine(process.stdout, 3);

  if (opts.styling > -1) {
    const selectedStyling = libs.styling[opts.styling];
    console.log(chalk.yellow(`  Docs for ${ selectedStyling.name }: ${ chalk.white(selectedStyling.docs) }`));
  }

  if (opts.scripting > -1) {
    const selectedScripting = libs.scripting[opts.scripting];
    console.log(chalk.yellow(`  Docs for ${ selectedScripting.name }: ${ chalk.white(selectedScripting.docs) }`));
  }

  if (opts.jsHelpers) {
    console.log(chalk.yellow(`  Docs for ${ libs.jsHelpers.name }: ${ chalk.white(libs.jsHelpers.docs) }`));
  }

  if (opts.patternLibrary > -1) {
    const selectedPatternLibrary = libs.patternLibraries[opts.patternLibrary];
    console.log(chalk.yellow(`  Docs for ${ selectedPatternLibrary.name }: ${ chalk.white(selectedPatternLibrary.docs) }`));
  }

  console.log(chalk.yellow(`\n  A17 Dev Docs: ${ chalk.white('http://docs.dev.area17.com/') }`));

  if (opts.installing.webpack) {
    console.log(chalk.yellow(`\n  Webpack setup added`));
    console.log(`  See package.json for available build, dev and prod tasks. It is a basic setup\n  and will likely need to be updated to suit your project needs - for example \n  updating the 'output.path' from './public' and updating 'devServer' settings.`);
    console.log(`\n  Tasks added:`);
    console.log(chalk.white(`    • npm run build`, chalk.gray(`builds assets, copies fonts`)));
    console.log(chalk.white(`    • npm run dev`, chalk.gray(`starts a webpack dev server (NB: generates assets in memory, ie. doesn't generate new asset files in the filesystem)`)));
    console.log(chalk.white(`    • npm run prod`, chalk.gray(`builds minified assets, copies fonts`)));
    console.log(chalk.white(`    • npm run watch`, chalk.gray(`builds assets, copies fonts, watches for changes and rebuilds`)));
  }

  if (opts.lintFiles && opts.installing.linters) {
    console.log(chalk.yellow(`\n  Lint tasks added`));
    console.log(chalk.white(`    • lint`, chalk.gray(`runs linters on changed files only`)));
    console.log(chalk.white(`    • lint:staged`, chalk.gray(`runs linters on staged files only`)));
    console.log(chalk.white(`    • lint:all`, chalk.gray(`runs linters on all files`)));

    console.log(chalk.white(`\n    • eslint`, chalk.gray(`runs eslint on changed files only`)));
    console.log(chalk.white(`    • prettier`, chalk.gray(`runs prettier on changed files only`)));
    console.log(chalk.white(`    • stylelint`, chalk.gray(`runs stylelint on changed files only`)));

    console.log(chalk.white(`\n    • eslint:all`, chalk.gray(`runs eslint on all files`)));
    console.log(chalk.white(`    • prettier:all`, chalk.gray(`runs prettier on all files`)));
    console.log(chalk.white(`    • stylelint:all`, chalk.gray(`runs stylelint on all files`)));
  }

  if (opts.git.init) {
    console.log(chalk.yellow(`\n  Git initialised - branch is '${ chalk.white('main') }'`));
    if (!opts.git.origin || opts.git.origin === '') {
      console.log(chalk.red(`  No Git remote specified. You will need to manually set your origin:`));
      console.log(chalk.white(`      git remote add origin YOUR_GIT_ORIGIN`));
    }
  }

  if (opts.installing.preCommitHook) {
    console.log(chalk.yellow(`\n  Husky pre-commit hook added`));
    if (!fs.existsSync('package.json')) {
      console.log(chalk.red(`  You currently don't have a package.json.\n  When you make one, you will need to manually add Husky prepare script:`));
      console.log(chalk.gray(`  // package.json`));
      console.log(chalk.white(`      {
        "scripts": {
          "prepare": "husky install"
        }
      }`));
    }

    if (!fs.existsSync('.git')) {
      console.log(chalk.red(`  Your app currently isn't under Git source control.\n  When you init git, you will need to add the Husky pre-commit hook to your repo:`));
      console.log(chalk.white(`      npx husky install
      npm pkg set scripts.prepare "husky install"
      npx husky add .husky/pre-commit "npm run lint:staged"
      git add .husky/pre-commit
      git commit -m "adds husky pre-commit hook"`));
    }
  }

  if (opts.patternLibrary > -1) {
    console.log(chalk.yellow(`\n  Pattern library installation`));
    console.log(chalk.white(`  Will require additional manual setup.`));
    console.log(chalk.gray(`  a17-generator config doesn't yet account for pattern library setup`));
  }

  console.log(`\n\n`);
}

export default postInstall;
