import chalk from 'chalk';
import readlineSync from 'readline-sync';

import libs from './libs.js';

const applicationOptions = () => {

  const opts = {
    styling: -1,
    scripting: -1,
    jsHelpers: false,
    patternLibrary: -1,
    installingVue: false,
    installingBehaviors: false,
    folderStructure: false,
    webpack: false,
  };

  console.log(chalk.cyan(`\nApplication styling with:`));
  opts.styling = readlineSync.keyInSelect(libs.styling.map(type => type.name), null,
    { cancel: 'None' }
  );

  console.log(chalk.cyan(`\nApplication JavaScript with:`));
  opts.scripting = readlineSync.keyInSelect(libs.scripting.map(type => type.name), null,
    { cancel: 'None' }
  );

  opts.installingVue = opts.scripting > -1 && libs.scripting[opts.scripting].name.indexOf('Vue') > -1;
  opts.installingBehaviors = opts.scripting > -1 && libs.scripting[opts.scripting].name.indexOf('Behaviors') > -1;

  if (opts.scripting === -1 || !opts.installingBehaviors) {
    console.log(chalk.cyan(`\nInclude A17 JS Helpers:`));
    opts.jsHelpers = readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'});
    opts.jsHelpers = opts.jsHelpers === 0;
  }

  console.log(chalk.cyan(`\nPattern Library:`));
  opts.patternLibrary = readlineSync.keyInSelect(libs.patternLibraries.map(type => type.name), null,
    { cancel: 'None' }
  );

  console.log(chalk.cyan(`\nAdd basic webpack setup?`));
  console.log(chalk.gray(`(will also add a default 'frontend' folder)`));
  opts.webpack = readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'});
  opts.webpack = opts.webpack === 0;

  if (opts.webpack) {
    opts.folderStructure = true;
  } else {
    console.log(chalk.cyan(`\nAdd default 'frontend' folder?`));
    opts.folderStructure = readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'});
    opts.folderStructure = opts.folderStructure === 0;
  }

  console.log(chalk.cyan(`\nAdd dot files?`));
  opts.dotFiles = readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'});
  opts.dotFiles = opts.dotFiles === 0;

  console.log(chalk.cyan(`\nAdd .nvmrc?`));
  opts.nvmrc = readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'});
  opts.nvmrc = opts.nvmrc === 0;

  return opts;
};

export default applicationOptions;
