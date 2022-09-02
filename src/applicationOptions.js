import chalk from 'chalk';
import readlineSync from 'readline-sync';

import libs from './libs.js';

const applicationOptions = () => {

  const opts = {
    styling: -1,
    scripting: -1,
    jsHelpers: false,
    patternLibrary: -1,
    dotFiles: false,
    lintFiles: false,
    git: {
      init: false,
      origin: null,
    },
    installing: {
      behaviors: false,
      scssUtilities: false,
      folderStructure: false,
      tailwindPlugins: false,
      vue: false,
      webpack: false,
      linters: false,
      laravel: false,
    },
  };

  console.log(chalk.cyan(`\nInitialise Git?`));
  opts.git.init = readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'});
  opts.git.init = opts.git.init === 0;
  console.log(chalk.gray(`${ opts.git.init ? 'Initialise Git' : 'Don\'t initialise Git' }`));

  if (opts.git.init) {
    console.log(chalk.cyan(`\nDo you have your Git remote URL?`));
    if (readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'}) === 0) {
      opts.git.origin = readlineSync.question('What is your Git remote URL? $ ');
    } else {
      console.log(chalk.gray(`No Git remote URL specified - will need manually setting later`));
    }
  }

  console.log(chalk.cyan(`\nApplication styling with:`));
  opts.styling = readlineSync.keyInSelect(libs.styling.map(type => type.name), null,
    { cancel: 'None' }
  );
  if (opts.styling > -1) {
    console.log(chalk.gray(`${ libs.styling[opts.styling].name } selected`));
  } else {
    console.log(chalk.gray(`No styling selected`));
  }

  opts.installing.scssUtilities = opts.styling > -1 && libs.styling[opts.styling].name.indexOf('SCSS') > -1;
  opts.installing.tailwindPlugins = opts.styling > -1 && libs.styling[opts.styling].name.indexOf('Tailwind') > -1;

  console.log(chalk.cyan(`\nApplication JavaScript with:`));
  opts.scripting = readlineSync.keyInSelect(libs.scripting.map(type => type.name), null,
    { cancel: 'None' }
  );
  if (opts.scripting > -1) {
    console.log(chalk.gray(`${ libs.scripting[opts.scripting].name } selected`));
  } else {
    console.log(chalk.gray(`No scripting selected`));
  }

  opts.installing.behaviors = opts.scripting > -1 && libs.scripting[opts.scripting].name.indexOf('Behaviors') > -1;
  opts.installing.vue = opts.scripting > -1 && libs.scripting[opts.scripting].name.indexOf('Vue') > -1;

  if (opts.scripting === -1 || !opts.installing.behaviors) {
    console.log(chalk.cyan(`\nInclude A17 JS Helpers:`));
    opts.jsHelpers = readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'});
    opts.jsHelpers = opts.jsHelpers === 0;
    console.log(chalk.gray(`${ opts.jsHelpers ? 'Install A17 JS Helpers' : 'Don\'t install A17 JS Helpers' }`));
  }

  console.log(chalk.cyan(`\nPattern Library:`));
  opts.patternLibrary = readlineSync.keyInSelect(libs.patternLibraries.map(type => type.name), null,
    { cancel: 'None' }
  );
  if (opts.patternLibrary > -1) {
    console.log(chalk.gray(`${ libs.scripting[opts.patternLibrary].name } selected`));
  } else {
    console.log(chalk.gray(`No Pattern Library selected`));
  }

  if (!opts.installing.vue) {
    console.log(chalk.cyan(`\nAdd basic webpack setup?`));
    console.log(chalk.gray(`(will also add a default 'frontend' folder)`));
    opts.installing.webpack = readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'});
    opts.installing.webpack = opts.installing.webpack === 0;
    console.log(chalk.gray(`${ opts.installing.webpack ? 'Add Webpack' : 'Don\'t add Webpack' }`));

    if (opts.installing.webpack) {
      opts.installing.folderStructure = true;
    } else {
      console.log(chalk.cyan(`\nAdd default 'frontend' folder?`));
      console.log(chalk.gray(`eg: /frontend/, /frontend/fonts/, /frontend/js/`));
      opts.installing.folderStructure = readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'});
      opts.installing.folderStructure = opts.installing.folderStructure === 0;
      console.log(chalk.gray(`${ opts.installing.folderStructure ? 'Add folder structure' : 'Don\'t add folder structure' }`));
    }

    if (opts.installing.folderStructure) {
      console.log(chalk.cyan(`\nIs this a Laravel app?`));
      console.log(chalk.gray(`eg: a Twill PHP app`));
      opts.installing.laravel = readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'});
      opts.installing.laravel = opts.installing.laravel === 0;
      console.log(chalk.gray(`${ opts.installing.laravel ? 'Is a Laravel app' : 'Is not a Laravel app' }`));
    }

    console.log(chalk.cyan(`\nAdd dot files?`));
    console.log(chalk.gray(`.editorconfig, .gitignore`));
    opts.dotFiles = readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'});
    opts.dotFiles = opts.dotFiles === 0;
    console.log(chalk.gray(`${ opts.dotFiles? 'Add dot files' : 'Don\'t add dot files' }`));

    console.log(chalk.cyan(`\nAdd lint setup dot files?`));
    console.log(chalk.gray(`.lintstagedrc, .eslintrc, .prettierrc and .stylelintrc`));
    opts.lintFiles = readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'});
    opts.lintFiles = opts.lintFiles === 0;
    console.log(chalk.gray(`${ opts.lintFiles? 'Add lint setup dot files' : 'Don\'t add lint setup dot files' }`));

    if (opts.lintFiles) {
      console.log(chalk.cyan(`\nAdd lint tasks?`));
      console.log(chalk.gray(`Installs lintstaged, eslint, prettier and stylelint`));
      opts.installing.linters = readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'});
      opts.installing.linters = opts.installing.linters === 0;
      console.log(chalk.gray(`${ opts.installing.linters? 'Add lint tasks' : 'Don\'t add lint tasks' }`));
    }

    console.log(chalk.cyan(`\nAdd README.md?`));
    opts.readme = readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'});
    opts.readme = opts.readme === 0;
    console.log(chalk.gray(`${ opts.readme ? 'Add README.md' : 'Don\'t add README.md' }`));

    console.log(chalk.cyan(`\nAdd .nvmrc?`));
    console.log(chalk.gray(`Sets to current node version`));
    opts.nvmrc = readlineSync.keyInSelect(['Yes'], null, { cancel: 'No'});
    opts.nvmrc = opts.nvmrc === 0;
    console.log(chalk.gray(`${ opts.nvmrc ? 'Add .nvmrc' : 'Don\'t add .nvmrc' }`));
  }

  return opts;
};

export default applicationOptions;
