import chalk from 'chalk';
import readlineSync from 'readline-sync';

import libs from './libs.js';

const applicationOptions = () => {

  const opts = {
    styling: -1,
    scripting: -1,
    jsHelpers: false,
    patternLibrary: -1,
  };

  console.log(chalk.cyan(`\nApplication styling with:`));
  opts.styling = readlineSync.keyInSelect(libs.styling.map(type => type.name), null,
    { cancel: 'None' }
  );

  console.log(chalk.cyan(`\nApplication JavaScript with:`));
  opts.scripting = readlineSync.keyInSelect(libs.scripting.map(type => type.name), null,
    { cancel: 'None' }
  );

  if (opts.scripting === -1 || libs.scripting[opts.scripting].name.indexOf('Behaviors') < 0) {
    opts.jsHelpers = readlineSync.keyInYN('\nInstall A17 JS Helpers?');
  }

  console.log(chalk.cyan(`\nPattern Library:`));
  opts.patternLibrary = readlineSync.keyInSelect(libs.patternLibraries.map(type => type.name), null,
    { cancel: 'None' }
  );

  return opts;
};

export default applicationOptions;
