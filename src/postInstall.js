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

  readlineSync.keyInPause(chalk.green(`  ${ appName } created - hit any key to see post installation notes.\n\n\n`), { guide: false });
  readline.moveCursor(process.stdout, 0, -4);
  readline.clearLine(process.stdout, 4);

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

  if (opts.git.init) {
    console.log(chalk.yellow(`\n  Git initialised - branch is '${ chalk.white('main') }'`));
    if (!opts.git.origin || opts.git.origin === '') {
      console.log(chalk.red(`  No Git remote specified. You will need to manually set your origin:`));
      console.log(chalk.white(`      git remote add origin YOUR_GIT_ORIGIN`));
    }
  }

  console.log(`\n\n`);
}

export default postInstall;
