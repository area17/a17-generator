import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import readlineSync from 'readline-sync';

import runCommand from './runCommand.js';
import libs from './libs.js';

// Generate package.json file for the project
const writePkgJson = (appName, opts) => {
  const folderStructurePrefix = opts.installing.laravel ? 'resources/' : '';

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

    if (opts.installing.vite) {
      packageJson.scripts = packageJson.scripts || {};
      if (opts.installing.scssUtilities) {
        packageJson.scripts.build = 'npm run tokens && vite build';
        packageJson.scripts.dev = 'npm run tokens && concurrently --raw --kill-others \"npm:dev:*\"';
        packageJson.scripts['dev:tokens'] = 'npx nodemon --exitcrash --watch ./frontend.config.json -e json --exec npm run tokens';
        packageJson.scripts['dev:vite'] = 'vite';
        packageJson.scripts.tokens = 'node ./node_modules/.bin/json-to-scss frontend.config.json ./frontend/scss/_tokens.scss --kv';
      } else {
        packageJson.scripts.build = 'vite build';
        packageJson.scripts.dev = 'vite';
      }
    }

    if (opts.lintFiles && opts.installing.linters) {
      packageJson.scripts = packageJson.scripts || {};
      // packageJson.scripts.eslint = `npx eslint $(git diff --name-only HEAD | xargs)`;
      // packageJson.scripts.prettier = `prettier --list-different $(git diff --name-only HEAD | xargs)`;
      // packageJson.scripts.stylelint = `npx stylelint $(git diff --name-only HEAD | xargs)`;

      // packageJson.scripts['eslint:all'] = `npx eslint "${ folderStructurePrefix }/**/*.js"`;
      // packageJson.scripts['prettier:all'] = `prettier --list-different "**/*.*"`;
      // packageJson.scripts['stylelint:all'] = `npx stylelint "${ folderStructurePrefix }/**/*.(css|scss|sass)"`;

      //packageJson.scripts.lint = `npm run eslint && npm run stylelint && npm run prettier`;
      //packageJson.scripts['lint:all'] = `npm run eslint:all && npm run stylelint:all && npm run prettier:all`;
      //packageJson.scripts['lint:staged'] = `lint-staged`;

      packageJson.scripts['lint:js'] = 'sh tools/linters.sh eslint';
      packageJson.scripts['lint:styles'] = 'sh tools/linters.sh stylelint';
      packageJson.scripts['precommit'] = 'lint-staged';

      packageJson.scripts['prettier:check'] = 'npx prettier --list-different --check $(git diff --name-only HEAD | xargs)';
      packageJson.scripts['prettier:write'] = 'npx prettier --list-different --write $(git diff --name-only HEAD | xargs)';

      packageJson['lint-staged'] = packageJson['lint-staged'] || {};
      packageJson['lint-staged']['package.json'] = 'sort-package-json';
      packageJson['lint-staged']['**/*'] = 'sh tools/linters.sh conflict-markers';
      packageJson['lint-staged']['**/*.{js,jsx,ts,tsx,vue}'] = 'sh tools/linters.sh eslint';
      packageJson['lint-staged']['**/*.{js,jsx,ts,tsx,html,css,php,vue}'] = 'sh tools/linters.sh prettify';
      packageJson['lint-staged']['**/*.blade.php'] = 'sh tools/linters.sh blast';
      packageJson['lint-staged']['**/*.php'] = 'sh tools/linters.sh phpstan';
    }

    if (opts.installing.preCommitHook) {
      packageJson.scripts = packageJson.scripts || {};
      packageJson.scripts.prepare = 'husky install';
    }

    packageJson.engines = packageJson.engines || {};
    packageJson.engines.node = process.version.replace(/v/i, '');
    packageJson.engines.npm = runCommand('npm -v');
    packageJson.engines.npm = packageJson.engines.npm.replace(/\n/i, '');
    packageJson.engines.yarn = 'please-use-npm';

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
