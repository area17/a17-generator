import child_process from 'child_process';
import chalk from 'chalk';
import figlet from 'figlet';

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

  console.log('  v0.0.1\n');

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
    console.log(chalk.yellow(`\n  Webpack setup added\n`));
    console.log(`  See package.json for available build, dev and prod tasks. It is a basic setup\n  and will likely need to be updated to suit your project needs - for example \n  updating the 'output.path' from './public' and updating 'devServer' settings.`);
    console.log(`\n  Tasks added:`);
    console.log(chalk.white(`    • npm run build`, chalk.gray(`builds assets, copies fonts`)));
    console.log(chalk.white(`    • npm run dev`, chalk.gray(`starts a webpack dev server (NB: generates assets in memory, ie. doesn't generate new asset files in the filesystem)`)));
    console.log(chalk.white(`    • npm run prod`, chalk.gray(`builds minified assets, copies fonts`)));
    console.log(chalk.white(`    • npm run watch`, chalk.gray(`builds assets, copies fonts, watches for changes and rebuilds`)));
  }

  console.log(`\n\n`);
}

export default postInstall;
